import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Config {
    //crudUrl: string;
}

/**
 * Servicio encargado de cargar la configuración.
 */
@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    public config: Config;

    constructor(private http: HttpClient) { 
        this.loadConfig()
    }

    loadConfig() {
        return this.http
            .get<Config>('./assets/config.json')
            .toPromise()
            .then(config => {
                this.config = config;
            });
    }

    // async loadConfig() {
    //     this.config = await this.http
    //         .get<Config>('./assets/config.json')
    //         .toPromise();
    // }
}