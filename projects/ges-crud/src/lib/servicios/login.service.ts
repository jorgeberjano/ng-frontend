import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { ConfigService } from './config.service';
import { Usuario } from './interfaces';


/**
 * Servicio encargado de tareas de login y registro de usuario
 */
@Injectable({
    providedIn: 'root'
})
export class LoginService {

    private endpoint: string;

    private httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };

    constructor(private http: HttpClient, private configService: ConfigService) {
        this.endpoint = localStorage.getItem("crudUrl");
    }

    public login(nombre: string, contrasena: string): Promise<any> {
        const url = this.endpoint + '/login';
        const usuario: Usuario = { nombre: nombre, contrasena: contrasena }
        const observable = this.http.post<any>(url, usuario, this.httpOptions);
        observable.pipe(
            tap(bodyResponse => this.almacenarToken(bodyResponse)),
            map(bodyResponse => bodyResponse.nombreUsuario)
        );

        return observable.toPromise();
    }

    private almacenarToken(bodyResponse: any): void {
        console.log(bodyResponse.token);
        localStorage.setItem('token', bodyResponse.token);
    }
    

}
