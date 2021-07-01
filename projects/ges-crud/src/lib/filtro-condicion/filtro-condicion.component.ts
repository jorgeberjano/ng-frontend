import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CondicionFiltro, Campo } from '../servicios/interfaces';
import { GesService } from '../servicios/ges.service';
import { NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ges-filtro-condicion',
  templateUrl: './filtro-condicion.component.html',
  styleUrls: ['./filtro-condicion.component.scss']
})
export class FiltroCondicionComponent implements OnInit {

  @Input() condicion: CondicionFiltro;
  @Output() eliminar: EventEmitter<CondicionFiltro> = new EventEmitter();

  constructor(private servicioGes: GesService,
    private timepickerConfig: NgbTimepickerConfig) {
    timepickerConfig.seconds = true;
    timepickerConfig.spinners = false;
  }

  ngOnInit() {
  }

  get operadores(): Array<any> {
    const operadores = new Array<any>();
    operadores.push({ id: 'eq', titulo: '=' });
    if (this.condicion.campo.tipoDato == 'CADENA') {
      operadores.push({ id: 'like', titulo: 'contiene' });
    }
    operadores.push({ id: 'gt', titulo: '>' });
    operadores.push({ id: 'gte', titulo: '>=' });
    operadores.push({ id: 'lt', titulo: '<' });
    operadores.push({ id: 'lte', titulo: '<=' });
    return operadores;
  }

  public setOperador(operador: string) {
    this.condicion.operador = operador;
  }

  public onEliminar() {
    this.eliminar.emit(this.condicion);
  }

  public getTipo(): string {
    if (this.condicion.campo.tipoDato === 'FECHA') {
      return 'fecha';
    } else if (this.condicion.campo.tipoDato === 'FECHA_HORA') {
      return 'fecha-hora';
    } else if (this.servicioGes.contexto.tieneOpcionesCampo(this.condicion.campo)) {
      return 'seleccion';
    } else {
      return 'texto';
    }
  }

  public getOpciones(): Array<string> {
    return this.servicioGes.contexto.getOpcionesCampo(this.condicion.campo);
  }
}
