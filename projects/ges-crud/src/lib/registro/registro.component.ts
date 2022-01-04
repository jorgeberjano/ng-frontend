import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../servicios/login.service';

@Component({
  selector: 'ges-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  registroForm: FormGroup;

  @Output() registroCompletado: EventEmitter<string> = new EventEmitter();

  @Input() empresas: Array<string> = [ 'EMPRESA1', 'EMPRESA2'];

  mostrarErrores = false;

  constructor(private loginService: LoginService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registroForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      contrasena: ['', Validators.required],
      contrasena2: ['', Validators.required],
      empresa: ['', Validators.required]
    });
  }
  registrar() {
    const nombre = this.f.nombre.value;
    const contrasena = this.f.contrasena.value;

    this.loginService.login(nombre, contrasena).subscribe(
      nombreUsuario => this.reportarRegistro(nombreUsuario),
      error => console.error(error)
    );
  }

  reportarRegistro(nombreUsuario: string) {
    this.registroCompletado.next(nombreUsuario);
  }

  get f() { return this.registroForm.controls; }
}
