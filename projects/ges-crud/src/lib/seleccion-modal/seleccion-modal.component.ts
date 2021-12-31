import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Consulta, EstadoConsulta, Orden } from '../servicios/interfaces';
import { GesService } from '../servicios/ges.service';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'ges-seleccion-modal',
  templateUrl: './seleccion-modal.component.html',
  styleUrls: ['./seleccion-modal.component.scss']
})
export class SeleccionModalComponent implements OnInit, OnChanges {
  public titulo: string;
  public esperando = true;
  @Input() idConsulta: string;
  public totalFilas: number;
  public datos: Array<object>;
  public estado: EstadoConsulta;

  constructor(private modalService: NgbModal,
     public activeModal: NgbActiveModal,
     private servicioGes: GesService) { }

  ngOnInit() {

    this.estado = this.servicioGes.contexto.getEstadoSeleccion(this.idConsulta);

    this.cargarDatosConsulta();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['consulta']) {
      this.cargarDatosConsulta();
    }
  }

  get campos() {
    return this.estado.campos;
  }

  public filaSeleccionada(fila: any): void {
    // console.log(' seleccionado: ' + fila);
    // const campo = this.servicioGes.contexto.getCampoClave(this.idConsulta);

    this.activeModal.close(fila);
  }

  public ordenEstablecido(orden: Orden): void {
    this.estado.orden = orden;
    this.cargarDatosConsulta();
  }

  public cambioPagina(pagina: number): void {
    this.estado.paginacion.pagina = pagina;
    this.cargarDatosConsulta();
  }

  public onSinSeleccion(): void {
    this.activeModal.close(null);
  }

  public cargarDatosConsulta() {
    if (!this.estado) {
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

  private reportarError(err: any): void {
    let mensaje = this.servicioGes.contexto.getMensajeError(err);
    // TODO: mostrar el error
  }

}
