import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoginService } from '../servicios/login.service';

@Component({
  selector: 'ges-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output() loginCompletado: EventEmitter<string> = new EventEmitter();

  nombre: string;
  contrasena: string;

  constructor(private loginService: LoginService) {    
  }

  ngOnInit() {
  }

  login() {
    console.log(this.nombre);
    console.log(this.contrasena);

    this.loginService.login(this.nombre, this.contrasena).then(
      nobreUsuario => this.loginCompletado.next(nobreUsuario),
      error => console.error(error)
    );
    
  }

}
