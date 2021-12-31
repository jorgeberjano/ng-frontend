import { Component, OnInit, ViewChild, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { GesService } from '../servicios/ges.service';
import { RejillaDatosComponent } from '../rejilla-datos/rejilla-datos.component';
import { NgbDropdown, NgbDropdownMenu } from '@ng-bootstrap/ng-bootstrap';
import { Campo, Consulta, Orden, Filtro, CondicionFiltro, Paginacion, EstadoConsulta } from '../servicios/interfaces';
import { map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { GesContexto } from '../servicios/ges-contexto';

@Component({
  selector: 'ges-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss'],
  providers: [NgbDropdown, NgbDropdownMenu]
})
export class ConsultaComponent implements OnInit, OnDestroy {

  @Input() contexto: GesContexto;
  @ViewChild('rejilla', {static: false}) rejilla: RejillaDatosComponent;
  public esperando = true;
  public idConsulta: string;
  public consulta: Consulta;
  public totalFilas: number;
  public columnas: Array<Campo>;
  public datos: Array<object>;
  public estado: EstadoConsulta;
  public esSeleccion = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private servicioGes: GesService) {
      if (!servicioGes) {
        console.error("No se ha inyectado GesService");
      }      
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idConsulta = params.get('idConsulta');
      this.servicioGes.contexto = this.contexto;
      this.consulta = this.contexto.getConsulta(this.idConsulta);
      this.cargarConsulta();
    });
  }

  ngOnDestroy() {

  }

  public cargarConsulta(): void {

    this.estado = this.servicioGes.contexto.getEstadoConsulta(this.idConsulta);

    this.consulta = this.servicioGes.contexto.getConsulta(this.idConsulta);
    //this.columnas = this.consulta.campos;

    this.columnas = this.servicioGes.contexto.getCamposConsulta(this.idConsulta).filter(campo => !this.servicioGes.contexto.esOculto(campo));

    this.cargarDatosConsulta();
  }

  public cargarDatosConsulta() {
    if (!this.consulta) {
      return;
    }

    this.servicioGes.obtenerDatosPagina(this.estado)
      .then(resp => this.asignarRespuesta(resp))
      .catch(err => this.reportarError(err));
  }

  private asignarRespuesta(resp: any): void {
    this.datos = this.decorarDatos(resp.entidadesUsuario);    
    this.totalFilas = resp.totalFilas;
    this.esperando = false;
  }

  private decorarDatos(datos: any): any {
    return datos.map(fila => this.decorarFila(fila));
  }

  private decorarFila(fila: any): any {
    const filaDecorada: object = {};
    this.consulta.campos.forEach(campo => filaDecorada[campo.idCampo] = this.decorarValor(campo, fila[campo.idCampo]));
    return filaDecorada;
  }

  private decorarValor(campo: Campo, valor: string): any {
    if (campo.unidad) {
      return valor + " " + campo.unidad;
    } else {
      return valor;
    }
  }

  public filaSeleccionada(fila: any): void {
    var ruta = '/edicion';
    const personalizacion = this.servicioGes.contexto.getPersonalizacionConsulta(this.idConsulta);
    if (personalizacion) {
      ruta = personalizacion.rutaEdicion;
    }

    const clave = this.getClaveEntidad(fila);
    console.log(this.consulta.nombreEnSingular + ' seleccionado: ' + clave);
    this.router.navigate([ruta, this.consulta.idConsulta, clave], { relativeTo: this.route });
  }

  public ordenEstablecido(orden: Orden): void {
    this.estado.orden = orden;
    this.cargarDatosConsulta();
  }

  public cambioPagina(pagina: number): void {
    this.estado.paginacion.pagina = pagina;
    this.cargarDatosConsulta();
  }

  public getClaveEntidad(fila: any): string {
    // TODO: implementar teniendo en cuenta que la entidad pueda tener varios campos clave
    if (!fila) {
      return null;
    }
    return fila[this.consulta.campos[0].idCampo];
  }

  public ejecutarAccion(accion: string) {
    //console.log(accion);
    switch (accion) {
      case 'crear':
        this.router.navigate(['/creacion', this.consulta.idConsulta], { relativeTo: this.route });
        break;
      case 'actualizar':
        this.cargarDatosConsulta();
        break;
      case 'filtrar':
        this.guardarEstado();
        this.router.navigate(['/filtro', this.consulta.idConsulta], { relativeTo: this.route });
        break;
      case 'configurar':
        this.guardarEstado();
        this.router.navigate(['/configuracion', this.consulta.idConsulta], { relativeTo: this.route });
        break;
      case 'exportar_pdf':
        this.exportar('pdf');
        break;
      case 'exportar_csv':
        this.exportar('csv');
        break;
      case 'exportar_excell':
        this.exportar('xlsx');
        break;
    }
  }

  private exportar(formato: string) {
    const url = this.servicioGes.urlExportacion(formato, this.estado);
    window.open(url);
  }

  private guardarEstado() {

  }

  private reportarError(err: any): void {
    this.esperando = false;
    
    const mensaje = this.servicioGes.contexto.getMensajeError(err);

    this.router.navigateByUrl('/error', { state: { mensaje: mensaje } });
  }
}

