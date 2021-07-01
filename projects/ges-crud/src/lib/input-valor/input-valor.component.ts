import { Component, Input, forwardRef, ViewChild, ElementRef, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbDateParserFormatter, NgbTimepickerConfig, NgbInputDatepicker, NgbTimepicker } from '@ng-bootstrap/ng-bootstrap';
import { CustomDateParserFormatter } from '../servicios/formato-fecha';
import { NgbTime } from '@ng-bootstrap/ng-bootstrap/timepicker/ngb-time';

@Component({
  selector: 'ges-input-valor',
  templateUrl: './input-valor.component.html',
  styleUrls: ['./input-valor.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputValorComponent),
    multi: true
  }, {
    provide: NgbDateParserFormatter,
    useClass: CustomDateParserFormatter
  },
    NgbTimepickerConfig
  ]
})
export class InputValorComponent implements OnInit, AfterViewInit, ControlValueAccessor {

  @ViewChild('inputTexto', {static: false}) inputTexto: ElementRef;
  @ViewChild('inputSelect', {static: false}) inputSelect: ElementRef;
  @ViewChild('inputFecha', {static: false}) inputFecha: NgbInputDatepicker;
  @ViewChild('inputHora', {static: false}) inputHora: NgbTimepicker;

  @Input() tipo: string;
  @Input() tamano: number;
  @Input() ancho: string;
  @Input() opciones: Array<string>;
  @Input() tieneSeleccion: false;
  @Output() seleccionado: EventEmitter<void> = new EventEmitter();
  public fecha: any;
  public hora: any;
  private valorAlmacenado: any;

  // Both onChange and onTouched are functions
  onChange: any = () => { };
  onTouched: any = () => { };

  constructor(private dateParserFormatter: NgbDateParserFormatter, timepickerConfig: NgbTimepickerConfig) {
    timepickerConfig.seconds = true;
    timepickerConfig.spinners = false;
  }

  ngOnInit() {
    this.actualizarInputs();
  }
  
  ngAfterViewInit () {
    this.actualizarInputs();
  }

  onChangeInputTexto(texto: string) {
    this.value = this.inputTexto.nativeElement.value;
    console.log('onChangeInputTexto');
  }

  onChangeInputSelect(evento: any) {
    this.value = this.inputSelect.nativeElement.value;
    console.log('onChangeInputSelect');
  }

  onChangeInputFecha(evento: any) {
    this.actualizarValorFecha();
    console.log('onChangeInputFecha');
  }

  onChangeInputHora(valor: any) {
    this.actualizarValorFecha();
    console.log('onChangeInputHora: ' + valor);
  }

  /**
   * Actualiza el valor del componente (texto) con el valor que tenga fecha ya sea texto o estructura ngDate
   */
  actualizarValorFecha() {
    let textoFecha = null;
    if (typeof this.fecha === 'string') {
      textoFecha = this.fecha;
    } else {
      textoFecha = this.dateParserFormatter.format(this.fecha);
    }
    if (this.hora) {
      textoFecha += ' ' + this.padNumber(this.hora.hour) + ':' +  this.padNumber(this.hora.minute) + ':' +  this.padNumber(this.hora.second);
    }
    this.value = textoFecha;
  }

  private padNumber(n: number): string {
    if (n < 10) {
      return '0' + n.toString();
    } else {
      return n.toString();
    }
  }

  get value() {
    console.log('get value');
    return this.valorAlmacenado;
  }

  @Input()
  set value(valor) {
    console.log('set value');
    this.valorAlmacenado = valor;
    this.onChange(valor);
    this.onTouched();
  }
  // Se implementa este método para mantener una referencia a la función
  // callback onChange proporcionada por la API forms
  registerOnChange(fn) {
    this.onChange = fn;
  }

  /**
   * Se implementa este método para mantener una referencia a la función
   */
  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  /**
   * Este es el setter bascio que la API forms va a usar
   */
  writeValue(valor) {
    this.value = valor;
    this.actualizarInputs();
  }

  /**
   * Actualiza los inputs con el valor almacenado
   */
  actualizarInputs() {
    if (this.inputTexto) {
      this.inputTexto.nativeElement.value = this.valorAlmacenado;
    } else if (this.inputSelect) {
      this.inputSelect.nativeElement.value = this.valorAlmacenado;
    } else if (this.inputFecha) {
      let textoFecha = this.valorAlmacenado;
      if (this.inputHora) {
        let partesFecha: Array<string> = textoFecha.split(' ');
        if (partesFecha.length > 0) {
          textoFecha = partesFecha[0];
        }
        if (partesFecha.length > 1) {
          let textoHora = partesFecha[1];
          let partesHora: Array<string> = textoHora.split(':');
          let hour = partesHora.length > 0 ? parseInt(partesHora[0]) : 0;
          let minute = partesHora.length > 1 ? parseInt(partesHora[1]) : 0;
          let second = partesHora.length > 2 ? parseInt(partesHora[2]) : 0;
          this.hora = { hour: hour, minute: minute, second: second };
        }
      }
      this.fecha = this.dateParserFormatter.parse(textoFecha);
    } else {
      console.error("No hay input")
    }
  }

  onSeleccion() {
    this.seleccionado.emit();
  }
}

