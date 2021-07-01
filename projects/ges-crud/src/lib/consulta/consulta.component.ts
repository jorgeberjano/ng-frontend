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
    //this.columnas = this.consulta.listaCampos;

    this.columnas = this.servicioGes.contexto.getCamposConsulta(this.idConsulta);

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

  private asignarRespuesta(resp: any) {
    this.datos = resp.entidadesUsuario;
    this.totalFilas = resp.totalFilas;
    this.esperando = false;
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
    console.log(accion);
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
    }
  }

  private guardarEstado() {

  }

  private reportarError(err: any): void {
    this.esperando = false;
    let mensaje = 'Error indefinido';
    if (err.error) {
      mensaje = err.error.message;
    } else if (err.message) {
      mensaje = err.message;
    } else if (typeof err === 'string') {
      mensaje = err;
    }

    this.router.navigateByUrl('/error', { state: { mensaje: mensaje } });
  }
}

