import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * Servicio para integración con una hipotetica API personalizada
 */
@Injectable({
    providedIn: 'root',
})
export class CustomService {

    private endpoint: string;// = 'http://localhost:8080/es';

    constructor(private http: HttpClient) {
        this.endpoint = localStorage.getItem("customUrl") + "/es";
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
