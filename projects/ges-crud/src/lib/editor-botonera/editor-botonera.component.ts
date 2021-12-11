import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Consulta } from '../servicios/interfaces';
import { GesContexto } from '../servicios/ges-contexto';
import { faSave, faTimes, faEdit, faTrash, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ges-editor-botonera',
  templateUrl: './editor-botonera.component.html',
  styleUrls: ['./editor-botonera.component.scss']
})
export class EditorBotoneraComponent implements OnInit {

  @Input() editando: boolean;
  @Input() formularioValido: boolean;
  @Input() consulta: Consulta;
  @Output() botonPulsado: EventEmitter<string> = new EventEmitter();

  faSave = faSave;
  faTimes = faTimes;
  faEdit = faEdit;
  faTrash = faTrash;
  faSignOutAlt = faSignOutAlt;

  constructor() { }

  ngOnInit() {
  }

  onBotonPulsado(accion: string) {
    this.botonPulsado.next(accion);
  }

  get permitirModificar(): boolean {
    return GesContexto.permitirModificacion(this.consulta);
  }

  get permitirBorrar(): boolean {
    return GesContexto.permitirBaja(this.consulta);
  }
}
