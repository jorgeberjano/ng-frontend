import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../servicios/login.service';

@Component({
  selector: 'ges-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  @Output() loginCompletado: EventEmitter<string> = new EventEmitter();

  mostrarErrores = false;

  constructor(private loginService: LoginService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  }

  login() {
    const nombre = this.f.nombre.value;
    const contrasena = this.f.contrasena.value;

    this.loginService.login(nombre, contrasena).subscribe(
      nombreUsuario => this.reportarLogin(nombreUsuario),
      error => console.error(error)
    );

  }

  reportarLogin(nombreUsuario: string) {
    this.loginCompletado.next(nombreUsuario);
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.mostrarErrores = true;
  }
}
