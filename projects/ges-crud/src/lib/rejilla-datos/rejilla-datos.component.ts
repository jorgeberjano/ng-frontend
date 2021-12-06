import { Component, OnInit, Input, Output, EventEmitter, Renderer } from '@angular/core';
import { Campo, Alineacion } from '../servicios/interfaces';
import { Resizer } from './resizer';

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
  private resizer: Resizer = new Resizer();

  constructor(private renderer: Renderer) { }

  ngOnInit() {
    // Se asignan los anchos de columna por defecto
    this.columnas.forEach(campo => { 
      if (campo.anchoColumna === undefined) {
        campo.anchoColumna = campo.longitud * 10;
      }      
    });

    this.renderer.listenGlobal('body', 'mousemove', (event) => this.resizer.mouseMove(event));
    this.renderer.listenGlobal('body', 'mouseup', (event) => this.resizer.mouseUp(event));
  }

  public onMouseDownResizer(event: MouseEvent, campo: Campo) {
    this.resizer.mouseDown(event, campo);
  }

  public onKeyDown(event: KeyboardEvent, fila: any) {
    if (event.code === "Enter") {
      this.onFilaSeleccionada(fila);
    }
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

  public getAnchoTabla(): number {
    var ancho = 0;
    this.columnas.forEach(campo => ancho += campo.anchoColumna);
    return ancho;
  }

  public getAlineacion(campo: Campo): string {
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
