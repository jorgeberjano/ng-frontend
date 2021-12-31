import { Component, OnInit, Input } from '@angular/core';
import { Campo, Consulta } from '../servicios/interfaces';
import { FormGroup, ValidatorFn, Validators, FormControl } from '@angular/forms';
import { GesService } from '../servicios/ges.service';

@Component({
  selector: 'ges-editor-campos',
  templateUrl: './editor-campos.component.html',
  styleUrls: ['./editor-campos.component.css']
})
export class EditorCamposComponent implements OnInit {

  @Input() consulta: Consulta;
  @Input() editando = false;
  @Input() validando = false;
  campos: Array<Campo> = [];
  formulario: FormGroup = new FormGroup({});

  constructor(private servicioGes: GesService) {
  }

  ngOnInit() {    
  }

  public crearFormulario(entidad: any) {

    if (!this.servicioGes.contexto) {
      return;
    }

    this.campos = this.consulta.campos;

    const grupo: any = {};  

    this.campos.forEach(campo => {

      const requerido = this.servicioGes.contexto.esRequerido(campo);
      const edicionTexto = this.servicioGes.contexto.getTipoEditor(campo) === 'texto';

      var valor = entidad ? entidad[campo.idCampo] : '';
      if (valor === undefined) {
        valor = '';
      }

      const validadores = new Array<ValidatorFn>();
      if (requerido) {
        validadores.push(Validators.required);
      }
      if (edicionTexto && campo.tamano > 0) {
        validadores.push(Validators.maxLength(campo.tamano));
      }

      grupo[campo.idCampo] = new FormControl(valor, validadores);
    });

    this.formulario = new FormGroup(grupo);
  }

  public esOculto(campo: Campo): boolean {
    return this.servicioGes.contexto.esOculto(campo);
  }

  public valorSeleccionado(campo: Campo, entidadSeleccionada: any) {

    if (campo.consultaSeleccion) {
      this.procesarValoresRelacionados(campo, entidadSeleccionada);
    }
  }

  public valorModificado(campo: Campo, valor: string) {

    if (campo.consultaSeleccion) {
      this.pedirValoresRelacionados(campo, valor);
    }
  }

  public pedirValoresRelacionados(campo: Campo, valor: string) {
    this.servicioGes.pedirValoresRelacionados(campo, valor).then(
      (r) => this.procesarValoresRelacionados(campo, r)
    );
  }

  public procesarValoresRelacionados(campo: Campo, entidadSeleccionada: any) {
    console.log(entidadSeleccionada);
    this.campos.forEach((otroCampo) => {
      if (otroCampo.idCampoRelacion === campo.idCampo) {
        this.asignarValor(otroCampo.idCampo, entidadSeleccionada[otroCampo.idCampoSeleccion]);
      }
    });
  }

  public asignarValor(idCampo: string, valor: string) {
    this.formulario.controls[idCampo].setValue(valor);
  }

  public getValores() {
    return this.formulario.invalid ? null : this.formulario.value;
  }

  
  public entidadGuardada(valores: any) {
    if (!valores) {
      return;
    }

    const entidad = this.servicioGes.contexto.aEntidadUsuario(this.consulta, valores);
    
    this.campos.forEach((campo) => {
      const valor = valores[campo.idCampo];
       if (valor !== undefined) {
         this.asignarValor(campo.idCampo, valor);
       }
    });
  }

  get formularioValido(): boolean {
    return this.formulario.valid;
  }

}
