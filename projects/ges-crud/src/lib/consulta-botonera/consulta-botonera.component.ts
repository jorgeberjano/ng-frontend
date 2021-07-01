import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'ges-consulta-botonera',
  templateUrl: './consulta-botonera.component.html',
  styleUrls: ['./consulta-botonera.component.scss']
})
export class ConsultaBotoneraComponent implements OnInit {

  @Input() esSeleccion: boolean;
  @Output() botonPulsado: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onBotonPulsado(accion: string) {
    this.botonPulsado.next(accion);
  }

}
