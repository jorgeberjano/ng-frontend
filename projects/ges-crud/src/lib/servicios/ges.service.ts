import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Campo, Consulta, Paginacion, Orden, CondicionFiltro, Filtro, EstadoConsulta} from './interfaces';
import { GesContexto } from './ges-contexto';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class GesService {

  public contexto: GesContexto;

  private endpoint: string = 'http://localhost:8080/es';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private configService: ConfigService) {
    //this.endpoint = configService.config["crudUrl"] + "/es";
  }

  public obtenerContexto(): Promise<GesContexto> {
    return this.http.get(this.endpoint + '/metadatos/').pipe(map(m => {
      const ctx = new GesContexto();
      ctx.metadatos = m;
      return ctx;
    })).toPromise();
  }
  
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
        var i = 0;
        estado.filtro.condiciones.forEach(condicion => url += this.generarParametroCondicion(condicion, i++));
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

  private generarParametroCondicion(condicion: CondicionFiltro, indice: number): string {
    if (!condicion || !condicion.campo || !condicion.campo.idCampo || !condicion.valor) {
      return '';
    }
    let parametro = condicion.campo.idCampo
    if (condicion.operador) {
      parametro += '_' + condicion.operador;
    }
    if (indice) {
      parametro += '~' + indice;
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

  public urlExportacion(formato: string, estado: EstadoConsulta): string {
    let url = this.endpoint + '/entidades/' + estado.consulta.idConsulta + '/exportacion/' + formato + '?';
    if (estado.orden && estado.orden.idCampo) {
      url += '_sort=' + estado.orden.idCampo + '&_order=' + (estado.orden.descendente ? 'DESC' : 'ASC') + '&';
    }
    if (estado.filtro) {
      var i = 0;
      estado.filtro.condiciones.forEach(condicion => url += this.generarParametroCondicion(condicion, i++));
    }
    if (url.endsWith('&') || url.endsWith('?')) {
      url = url.slice(0, -1);
    } 
    return url;   
  }

}
