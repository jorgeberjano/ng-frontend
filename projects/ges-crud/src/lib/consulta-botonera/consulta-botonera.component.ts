import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Consulta } from '../servicios/interfaces';
import { GesContexto } from '../servicios/ges-contexto';

@Component({
  selector: 'ges-consulta-botonera',
  templateUrl: './consulta-botonera.component.html',
  styleUrls: ['./consulta-botonera.component.scss']
})
export class ConsultaBotoneraComponent implements OnInit {

  @Input() esSeleccion: boolean;
  @Input() consulta: Consulta;
  @Output() botonPulsado: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onBotonPulsado(accion: string) {
    this.botonPulsado.next(accion);
  }

  get permitirCrear(): boolean {
    return GesContexto.permitirAlta(this.consulta);
  }

  get permitirFiltrar(): boolean {
    return GesContexto.permitirFiltro(this.consulta);
  }

  get permitirConfigurar(): boolean {
    return GesContexto.permitirConfiguracion(this.consulta);
  }

  get permitirExportar(): boolean {
    return GesContexto.permitirExportacion(this.consulta);
  }

}
