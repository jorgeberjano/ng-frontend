import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'projects/ges-crud/src/lib/servicios/config.service';

/**
 * Servicio para integración con una hipotetica API personalizada
 */
@Injectable({
    providedIn: 'root',
})
export class CustomService {

    private endpoint;// = 'http://localhost:8080/es';

    constructor(private http: HttpClient,
        private configService: ConfigService) {
        this.endpoint = configService.config["customUrl"] + "/es";
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
