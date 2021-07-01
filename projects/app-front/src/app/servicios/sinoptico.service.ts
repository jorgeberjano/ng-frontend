import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class SinopticoService {

    private endpoint = 'http://localhost:8080/es';

    constructor(private http: HttpClient) {
    }

    public obtenerSinoptico(id: string): Promise<string> {
        const headers = new HttpHeaders();
        headers.set('Accept', 'image/svg+xml');
        return this.http.get(this.endpoint + '/sinopticos/' + id, { headers, responseType: 'text' }).toPromise();
    }

}
