import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Campo } from '../servicios/interfaces';
import { GesService } from '../servicios/ges.service';
import { CustomDateParserFormatter} from '../servicios/formato-fecha';
import { NgbDateParserFormatter, NgbTimepickerConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SeleccionModalComponent } from '../seleccion-modal/seleccion-modal.component';

@Component({
  selector: 'ges-editor-valor',
  templateUrl: './editor-valor.component.html',
  styleUrls: ['./editor-valor.component.scss'],
  providers: [
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
    NgbTimepickerConfig
   ]
})
export class EditorValorComponent implements OnInit {
  @Input() campo: Campo;
  @Input() formulario: FormGroup;
  @Input() validando: boolean;
  @Input() editando: boolean;
  @Output() valorSeleccionado: EventEmitter<string> = new EventEmitter();

  public oculto: boolean;

  constructor(private servicioGes: GesService, private modalService: NgbModal, timepickerConfig: NgbTimepickerConfig) {
    timepickerConfig.seconds = true;
    timepickerConfig.spinners = false;
  }

  ngOnInit() {
    this.oculto = this.servicioGes.contexto.esOculto(this.campo);
  }

  get tipo(): string {
    return this.servicioGes.contexto.getTipoEditor(this.campo);
  }

  get opciones(): Array<string> {
    return this.servicioGes.contexto.getOpcionesCampo(this.campo);
  }  

  get permitirEdicion(): boolean {
    if (!this.editando || this.oculto) {
      return false;
    }
    if (this.esSeleccionable) {
      return true;
    }
    const soloLectura = this.servicioGes.contexto.esSoloLectura(this.campo);
    return !soloLectura;
  }

  get tamanoMaximo(): number {
    return this.campo.tamano > 0 ? this.campo.tamano : 524288;
  }

  get anchoMaximo(): string {
    return this.campo.longitud * 20 + 'px';
  }

  get unidad(): string {
    return this.campo.unidad;
  }

  get esSeleccionable(): boolean {
    return this.campo.consultaSeleccion ? true : false;
  }

  get tieneErrores(): boolean {
     return this.editando && this.validando && !this.formulario.controls[this.campo.idCampo].valid;
  }

  get mensajeError(): string {
    const control = this.formulario.controls[this.campo.idCampo];
    if (control.errors.required) {
      return 'El campo ' + this.campo.titulo + ' debe tener un valor';
    } else if (control.errors.maxlength) {
      return 'El valor de ' + this.campo.titulo + ' es demasiado grande';
    }
  }

  mostrarSeleccionModal() {
    const modalRef = this.modalService.open(SeleccionModalComponent);
    modalRef.componentInstance.idConsulta = this.campo.consultaSeleccion;
    modalRef.componentInstance.titulo = 'Selección de ' + this.campo.titulo;
    modalRef.result.then((entidadSeleccionada) => this.seleccionarValor(entidadSeleccionada));
  }

  seleccionarValor(entidadSeleccionada: any) {
    const valor = entidadSeleccionada ? entidadSeleccionada[this.campo.idCampoSeleccion] : '';
    this.formulario.controls[this.campo.idCampo].setValue(valor);
    this.valorSeleccionado.next(entidadSeleccionada);
  }
}
