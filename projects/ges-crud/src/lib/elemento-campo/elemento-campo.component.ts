import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Campo } from '../servicios/interfaces';

@Component({
  selector: 'ges-elemento-campo',
  templateUrl: './elemento-campo.component.html',
  styleUrls: ['./elemento-campo.component.scss']
})
export class ElementoCampoComponent implements OnInit {
  @Input() campo: Campo;
  @Output() cambio = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  eliminar() {
    this.cambio.emit({ campo: this.campo, accion: 0 });
    console.log('eliminar');
  }

}
