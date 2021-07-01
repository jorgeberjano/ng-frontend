import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Campo, Alineacion } from '../servicios/interfaces';

@Component({
  selector: 'ges-rejilla-datos',
  templateUrl: './rejilla-datos.component.html',
  styleUrls: ['./rejilla-datos.component.scss']
})
export class RejillaDatosComponent implements OnInit {

  @Input() columnas: Array<Campo>;
  @Input() datos: Array<any>;
  @Output() filaSeleccionada = new EventEmitter();
  @Output() ordenEstablecido = new EventEmitter();
  private orden = { idCampo: null, descendente: false };

  constructor() { }

  ngOnInit() {
    // console.log(this.columnas);
    // console.log(this.datos);
  }

  public onFilaSeleccionada(fila: any) {
    this.filaSeleccionada.emit(fila);
  }

  public onOrdenEstablecido(campo: Campo) {
    if (campo.idCampo === this.orden.idCampo) {
      this.orden.descendente = !this.orden.descendente;
    } else {
      this.orden.idCampo = campo.idCampo;
      this.orden.descendente = false;
    }
    this.ordenEstablecido.emit(this.orden);
  }

  public getAnchoColumna(campo: Campo) {
    return campo.longitud * 10;
  }

  public getAlineacion(campo: Campo) {
    switch (campo.alineacion) {
      case Alineacion.Centro:
        return 'text-center';
      case Alineacion.Derecha:
        return 'text-right';
      default:
        return 'text-left';
    }
  }

  public getIconoOrden(campo: Campo) {
    if (campo.idCampo === this.orden.idCampo) {
      return this.orden.descendente ? 'sort-up' : 'sort-down';
    } else {
      return 'icon-sign-blank';
    }
  }

  public getValorRepresentado(fila: any, campo: Campo) {
    return fila[campo.idCampo];
  }

}
