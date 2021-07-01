import { Injectable } from '@angular/core';

import { HttpHeaders, HttpClient } from '@angular/common/http';

import { GesContexto } from 'projects/ges-crud/src/lib/servicios/ges-contexto';

import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class IrisService {

    private endpoint = 'http://localhost:8080/es';

    constructor(private http: HttpClient) {
    }

    public obtenerFotoPersona(id: string): Promise<Blob> {
        return this.http.get(this.endpoint + '/fotos/' + id, { responseType: 'blob' }).toPromise();
    }

    public guardarFotoPersona(id: string, imagen: any): Promise<Blob> {
        let formdata: FormData = new FormData();
        
        formdata.append('archivo', imagen);
        return this.http.put<any>(this.endpoint + '/fotos/' + id, formdata, { reportProgress: true }).toPromise();
    }
}
