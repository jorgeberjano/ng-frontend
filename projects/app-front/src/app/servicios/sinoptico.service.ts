import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from 'projects/ges-crud/src/lib/servicios/config.service';

/**
 * Servicio para integración con la API de sinopticos
 */
@Injectable({
    providedIn: 'root',
})
export class SinopticoService {

    private endpoint;// = 'http://localhost:8081/es';

    constructor(private http: HttpClient,
        private configService: ConfigService) {
        this.endpoint = configService.config["sinopticosUrl"] + "/es";
    }

    public obtenerSinoptico(id: string): Promise<string> {
        const headers = new HttpHeaders();
        headers.set('Accept', 'image/svg+xml');
        return this.http.get(this.endpoint + '/sinopticos/' + id, { headers, responseType: 'text' }).toPromise();
    }

}
