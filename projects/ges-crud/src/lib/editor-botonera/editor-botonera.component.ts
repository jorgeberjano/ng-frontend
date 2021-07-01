import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'ges-editor-botonera',
  templateUrl: './editor-botonera.component.html',
  styleUrls: ['./editor-botonera.component.scss']
})
export class EditorBotoneraComponent implements OnInit {

  @Input() editando: boolean;
  @Input() formularioValido: boolean;
  @Output() botonPulsado: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onBotonPulsado(accion: string) {
    this.botonPulsado.next(accion);
  }
}
