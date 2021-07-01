import { EstadoConsulta, Consulta, Campo, CondicionFiltro, Filtro, PersonalizacionConsulta } from './interfaces';
import { GesService } from './ges.service';

export class GesContexto {

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

  public metadatos: any = {};
  public mapaEstados = new Map<string, EstadoConsulta>();
  private mapaPersonalizaciones = new Map<string, PersonalizacionConsulta>();


  public setPersonalizacionConulta(idConsulta: string, personalizacion: PersonalizacionConsulta) {
    this.mapaPersonalizaciones.set(idConsulta, personalizacion); 
  }

  public getPersonalizacionConsulta(idConsulta: string): PersonalizacionConsulta {
    return this.mapaPersonalizaciones.get(idConsulta);
  }

  public getConsulta(idConsulta: string): Consulta {
    //console.log('>>> se pide la consulta ' + idConsulta + " en " + GesService.id);
    if (!this.metadatos) {
      return null;
    }
    return this.metadatos.find((consulta: Consulta) => consulta.idConsulta === idConsulta);
  }

  public getCampoClave(idConsulta: string) : Campo {
    const consulta = this.getConsulta(idConsulta);
    //TODO: devolver null si hay varios campos clave
    return consulta.campos.find ((campo) => this.esClave(campo));
  }

  public esClave(campo: Campo): boolean {
    // tslint:disable-next-line: no-bitwise
    return (campo.estilo & GesContexto.CAMPO_CLAVE) !== 0;
  }

  public esNombre(campo: Campo): boolean {    
    return campo.tipoRol == 'NOMBRE';
  }

  public esRequerido(campo: Campo): boolean {
    // tslint:disable-next-line: no-bitwise
    return (campo.estilo & GesContexto.CAMPO_REQUERIDO) !== 0;
  }

  public esSoloLectura(campo: Campo) : boolean {
    // tslint:disable-next-line: no-bitwise
    return (campo.estilo & GesContexto.CAMPO_SOLO_LECTURA) !== 0;
  }

  public esOculto(campo: Campo) : boolean {
    // tslint:disable-next-line: no-bitwise
    return (campo.estilo & GesContexto.CAMPO_OCULTO) !== 0;
  }

  public tieneOpcionesCampo(campo: Campo): boolean {
    return campo.formato.startsWith('#');
  }

  /**
   * Obtiene las opciones que pueden tener el valor de un campo al ser seleccionado en un combo.
   */

  public getOpcionesCampo(campo: Campo): Array<string> {
    if (!campo.formato.startsWith('#')) {
      return [];
    }
    return campo.formato.slice(1).split('#');
  }

  public getTipoEditor(campo: Campo): string {
    if (campo.tipoDato === 'FECHA') {
      return 'fecha';
    } else if (campo.tipoDato === 'FECHA_HORA') {
      return 'fecha-hora';
    } else if (this.tieneOpcionesCampo(campo) && !this.esSoloLectura(campo)) {
      return 'seleccion';
    } else {
      return 'texto';
    }
  }


  /**
   * Convierte una entidad de usuario a entidades de negocio.
   */
  public aEntidadNegocio(consulta: Consulta, entidadUsuario: any): any {
    const entidadNegocio = {};
    consulta.campos.forEach(campo => entidadNegocio[campo.idCampo] = this.aValorNegocio(campo, entidadUsuario[campo.idCampo]));
    return entidadNegocio;
  }

  /**
   * Convierte un array de entidades de negocio a entidades de usuario.
   */
  public aEntidadesUsuario(consulta: Consulta, entidades: Array<any>) {
    return entidades.map(entidad => this.aEntidadUsuario(consulta, entidad));
  }

  /**
   * Convierte una entidad de negocio a entidades de usuario.
   */
  public aEntidadUsuario(consulta: Consulta, entidadNegocio: any) {
    const entidadUsuario = {};
    consulta.campos.forEach(campo => entidadUsuario[campo.idCampo] = this.aValorUsuario(campo, entidadNegocio[campo.idCampo]));
    return entidadUsuario;
  }

  /**
   * Convierte un valor de negocio de un campo a su valor de usuario.
   */
  public aValorUsuario(campo: Campo, valorNegocio: any): string {
    if (valorNegocio === null || valorNegocio === undefined) {
      return '';
    }

    let valorUsuario = valorNegocio.toString();
    const opciones = this.getOpcionesCampo(campo);
    if (opciones && opciones.length > 0) {
      if (campo.tipoDato === 'BOOLEANO') {
        valorUsuario = opciones[valorNegocio ? 1 : 0];
      } else if (campo.tipoDato === 'ENTERO' && typeof(valorNegocio) === 'number') {
        valorUsuario = valorNegocio >= 0 && valorNegocio < opciones.length ? opciones[valorNegocio] : '';
      }
    }
    return valorUsuario;
  }

  /**
   * Convierte un valor de usuario de un campo a su valor de negocio.
   */
  public aValorNegocio(campo: Campo, valorUsuario: string): any {
    if (!valorUsuario) {
      return null;
    }
    let valorNegocio: any = valorUsuario;
    const opciones = this.getOpcionesCampo(campo);
    if (opciones && opciones.length > 0) {
      if (campo.tipoDato === 'BOOLEANO') {
        valorNegocio = valorUsuario !== opciones[0];
      } else if (campo.tipoDato === 'ENTERO') {
        valorNegocio = opciones.findIndex(e => e === valorUsuario);
      }
    }
    return valorNegocio;
  }

  public getEstadoConsulta(idConsulta: string): EstadoConsulta {
    let estado = this.mapaEstados.get(idConsulta);
    if (estado == null) {
      const consulta = this.getConsulta(idConsulta); // TODO: obtener la configuracion del usuario
      if (consulta == null) {
        return null;
      }
      
      const listaCampos : Array<Campo> = [];
      if (consulta.campos) {
        consulta.campos.forEach(c => listaCampos.push(c));
      }

      estado = {
        consulta: consulta, 
        filtro: {
          condiciones: new Array<CondicionFiltro>()
        },
        orden: {
          idCampo: null,
          descendente: false
        },
        paginacion: {
          pagina: 0,
          limite: 10
        },
        campos: listaCampos
      }
    }
    return estado;
  }

  public setEstadoConsulta(idConsulta: string, estado: EstadoConsulta) {
    this.mapaEstados.set(idConsulta, estado);
  }

  public setFiltroConsulta(idConsulta: string, filtro: Filtro) {
    const estado = this.getEstadoConsulta(idConsulta);
    if (estado) {
      estado.filtro = filtro;
      this.setEstadoConsulta(idConsulta, estado);
    }    
  }

  public setCamposConsulta(idConsulta: string, campos: Array<Campo>) {
    const estado = this.getEstadoConsulta(idConsulta);
    if (estado) {
      estado.campos = campos;
      this.setEstadoConsulta(idConsulta, estado);
    }    
  }

  public getCamposConsulta(idConsulta: string) : Array<Campo> {
    const estado = this.getEstadoConsulta(idConsulta);
    return estado ? estado.campos : null;
  }  

  public getEstadoSeleccion(idConsulta: string): EstadoConsulta {
    let estado = this.mapaEstados.get(idConsulta);
    if (estado == null) {
      const consulta = this.getConsulta(idConsulta); // TODO: obtener la configuracion del usuario
      if (consulta == null) {
        return null;
      }
      
      const listaCampos : Array<Campo> = [];
      consulta.campos.forEach(c => {
        if (this.esClave(c) || this.esNombre(c)) {
          listaCampos.push(c);
        }
      });      

      estado = {
        consulta: consulta, 
        filtro: {
          condiciones: new Array<CondicionFiltro>()
        },
        orden: {
          idCampo: null,
          descendente: false
        },
        paginacion: {
          pagina: 0,
          limite: 10
        },
        campos: listaCampos
      }
    }
    return estado;
  }

  public getMensajeError(err: any): string {
    let mensaje = 'Error indefinido';
    if (err.error) {
      mensaje = err.error.message;
    } else if (err.message) {
      mensaje = err.message;
    } else if (typeof err === 'string') {
      mensaje = err;
    }
    return mensaje;
  }
}