import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Campo } from '../servicios/interfaces';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ges-elemento-campo',
  templateUrl: './elemento-campo.component.html',
  styleUrls: ['./elemento-campo.component.scss']
})
export class ElementoCampoComponent implements OnInit, AfterViewInit {

  @ViewChild('inputAncho', {static: false}) inputAncho: ElementRef;

  @Input() campo: Campo;
  @Output() cambio = new EventEmitter<any>();

  faTrash = faTrash;

  constructor() { }

  ngOnInit() {
  }
  
  ngAfterViewInit() {
    this.actualizarAncho();
  }

  eliminar() {
    this.cambio.emit({ campo: this.campo, accion: 0 });
    console.log('eliminar');
  }

  onChangeAncho(evento: any) {
    this.campo.longitud = Number(this.inputAncho.nativeElement.value);
  }

  /**
   * Actualiza los inputs con el valor almacenado
   */
   actualizarAncho() {
    if (this.inputAncho) {
      this.inputAncho.nativeElement.value = Math.round(this.campo.longitud);
    }
  }

}
