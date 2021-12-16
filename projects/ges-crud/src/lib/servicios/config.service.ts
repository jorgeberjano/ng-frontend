import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Config {
    crudUrl: string;
}

/**
 * Servicio encargado de cargar la configuración.
 */
@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    constructor(private http: HttpClient) { 
    }

    loadConfig() {
        return this.http
            .get<Config>('./assets/config.json')
            .toPromise()
            .then(config => {
                localStorage.setItem('crudUrl', config.crudUrl);
                console.log ("Se ha cargado config.json: ", config);
            });
    }
}