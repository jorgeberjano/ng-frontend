import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Campo, Consulta, Paginacion, Orden, CondicionFiltro, Filtro, EstadoConsulta} from './interfaces';
import { GesContexto } from './ges-contexto';

@Injectable({
  providedIn: 'root',
})
export class GesService {

  public static readonly ROL_NORMAL = 0;
  public static readonly ROL_ITOTAL = 1;
  public static readonly ROL_FTOTAL = 2;
  public static readonly ROL_GRUPO = 3;
  public static readonly ROL_NOMBRE = 4;
  
  public static readonly CAMPO_NO_EDITABLE = 0x000001;
  public static readonly CAMPO_NO_ACTUALIZABLE_EN_EDICION = 0x000002;
  public static readonly CAMPO_SIEMPRE_MAYUSCULAS = 0x000004;
  public static readonly CAMPO_MOSTRAR_BOTON_LUPA = 0x000008;
  public static readonly CAMPO_REQUERIDO = 0x000010;
  public static readonly CAMPO_SELECCION_OBLIGATORIA = 0x000020;
  public static readonly CAMPO_CLAVE = 0x000040;
  public static readonly CAMPO_FORMATO_CON_UNIDAD = 0x000080;
  public static readonly CAMPO_NO_EDITABLE_EN_SUBCONSULTA = 0x000100;
  public static readonly CAMPO_SOLO_LECTURA = 0x000200;
  public static readonly CAMPO_SELECCION_RECOMENDABLE = 0x000400;
  public static readonly CAMPO_IMPRIMIR_ACUMULADO = 0x000800;
  public static readonly CAMPO_ACUMULAR_MEDIA = 0x001000;
  public static readonly CAMPO_OCULTO = 0x002000;
  public static readonly CAMPO_FILTRO_PREVIO_OBLIGATORIO = 0x004000;
  public static readonly CAMPO_OCULTAR_SUBTOTALES_DE_GRUPO = 0x008000;
  public static readonly CAMPO_SALTO_PAGINA_AL_SUBTOTALIZAR = 0x010000;
  public static readonly CAMPO_NO_MODIFICABLE = 0x020000;
  public static readonly CAMPO_PROPONER_VALORES = 0x040000;
  public static readonly CAMPO_NO_NULO = 0x080000;
  public static readonly CAMPO_NO_SUBTOTALIZAR = 0x100000;
  public static readonly CAMPO_ORDEN_INICIAL = 0x200000;
  public static readonly CAMPO_SOLO_FILTRO = 0x400000;

  public static readonly ALINEACION_IZQUIERDA = 0;
  public static readonly ALINEACION_DERECHA = 1;
  public static readonly ALINEACION_CENTRO = 2;

  public contexto: GesContexto;

  private endpoint = 'http://localhost:8080/es';
  //private endpoint = 'http://10.234.253.188:8080/es';
  //private endpoint = 'http://centos.shsconsultores.es:8080/es';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  //private id: number;
//  private metadatos: any;  
//  private mapaEstados = new Map<string, EstadoConsulta>();

  constructor(private http: HttpClient) {
    // if (!this.id) {
    //   this.id = Math.random();
    //   console.log("Se crea una instancia de GesService con ID: " + this.id);
    // } else {
    //   console.log("Se crea una instancia de GesService pero conseva su ID: " + this.id);
    // }
  }

  public obtenerContexto(): Promise<GesContexto> {
    // if (this.metadatos) {
    //   return Promise.resolve(this.metadatos);
    // }
    //return this.http.get(this.endpoint + '/metadatos/').pipe(tap(m => this.setMetadatos(m))).toPromise();
    return this.http.get(this.endpoint + '/metadatos/').pipe(map(m => {
      const ctx = new GesContexto();
      ctx.metadatos = m;
      return ctx;
    })).toPromise();
  }

  // public setMetadatos(metadatos: any) {
  //   console.log('se establecen los metadatos en ' + GesService.id);
  //   this.metadatos = metadatos;
  // }

  // public getMetadatos() {
  //   return this.metadatos;
  // }

  
  public obtenerEntidad(consulta: Consulta, clave: string): Promise<any> {
    return this.http.get(this.endpoint + '/entidades/' + consulta.idConsulta + '/' + clave).pipe(
      map(e => this.contexto.aEntidadUsuario(consulta, e))
    ).toPromise();
  }

  public pedirValoresRelacionados(campo: Campo, valor: string): Promise<any> {

    const consultaRelacionada = this.contexto.getConsulta(campo.consultaSeleccion);

    return this.http.get(this.endpoint + '/entidades/' + campo.consultaSeleccion + '?' + campo.idCampoSeleccion + "=" + valor).pipe(
      map(entidad => this.contexto.aEntidadUsuario(consultaRelacionada, entidad))
    ).toPromise();
  }

  public obtenerDatosPagina(estado: EstadoConsulta): Promise<any> {
      let url = this.endpoint + '/entidades/' + estado.consulta.idConsulta + '?';
      if (estado.paginacion) {
        url += '_page=' + estado.paginacion.pagina + '&_limit=' + estado.paginacion.limite + '&';
      }
      if (estado.orden && estado.orden.idCampo) {
        url += '_sort=' + estado.orden.idCampo + '&_order=' + (estado.orden.descendente ? 'DESC' : 'ASC') + '&';
      }
      if (estado.filtro) {
        estado.filtro.condiciones.forEach(condicion => url += this.generarParametroCondicion(condicion));
      }

      if (url.endsWith('&')) {
        url = url.slice(0, -1);
      }

      return this.http.get(url, { observe: 'response' }).pipe(map(resp => {
          const entidadesNegocio: any = resp.body;
          return {
            entidadesUsuario: this.contexto.aEntidadesUsuario(estado.consulta, entidadesNegocio),
            totalFilas: resp.headers.get('X-Total-Count')
          };
        })
      ).toPromise();
  }

  private generarParametroCondicion(condicion: CondicionFiltro): string {
    if (!condicion || !condicion.campo || !condicion.campo.idCampo || !condicion.valor) {
      return '';
    }
    let parametro = condicion.campo.idCampo
    if (condicion.operador) {
      parametro += '_' + condicion.operador;
    }
    let valorNegocio = this.contexto.aValorNegocio(condicion.campo, condicion.valor);
    parametro += '=' + valorNegocio + '&';
    return parametro;
  }


  /**
   * Convierte un array de entidades de usuario a entidades de negocio.
   */
  public aEntidadesNegocio(consulta: Consulta, entidadesUsuario: Array<any>): any {
    return entidadesUsuario.map(entidad => this.contexto.aEntidadNegocio(consulta, entidad));
  }

  public modificarEntidad(consulta: Consulta, clave: string, entidadUsuario: any): Promise<any> {
    const url = this.endpoint + '/entidades/' + consulta.idConsulta + '/' + clave;
    const entidadNegocio = this.contexto.aEntidadNegocio(consulta, entidadUsuario);
    return this.http.put<any>(url, entidadNegocio, this.httpOptions).toPromise();
  }

  public insertarEntidad(consulta: Consulta, entidadUsuario: any): Promise<any> {
    const url = this.endpoint + '/entidades/' + consulta.idConsulta;
    const entidadNegocio = this.contexto.aEntidadNegocio(consulta, entidadUsuario);
    return this.http.post<any>(url, entidadNegocio, this.httpOptions).toPromise();
  }

  public borrarEntidad(consulta: Consulta, clave: string): Promise<any> {
    const url = this.endpoint + '/entidades/' + consulta.idConsulta + '/' + clave;
    return this.http.delete<any>(url, this.httpOptions).toPromise();
  }

}
