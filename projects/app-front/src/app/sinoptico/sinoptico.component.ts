import { AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { SinopticoService } from '../servicios/sinoptico.service';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Component({
  selector: 'app-sinoptico',
  templateUrl: './sinoptico.component.html',
  styleUrls: ['./sinoptico.component.css']
})
export class SinopticoComponent implements OnInit, AfterViewInit {

  @ViewChild('divSinoptico', { static: true }) divSinoptico: ElementRef<any>;

  public esperando = true;
  public idSinoptico: string;  
  private myWebSocket: WebSocketSubject<any> = webSocket('ws://localhost:8080/sinoptico/visor-peso/1');
    
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private servicioSinoptico: SinopticoService) {
      if (!servicioSinoptico) {
        console.error("No se ha inyectado SinopticoService");
      }      
  }
  
  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idSinoptico = params.get('idSinoptico');
      this.cargarSinoptico();

      this.myWebSocket.subscribe(    
        msg => this.procesarComando(msg), 
        // Called whenever there is a message from the server    
        err => console.error(err), 
        // Called if WebSocket API signals some kind of error    
        () => console.log('complete') 
        // Called when connection is closed (for whatever reason)  
     );
    });
  }
  procesarComando(comando: any): void {
    console.log('message received: ' + comando);
    const element = this.divSinoptico.nativeElement.querySelector('#' + comando.idElemento);
    if (comando.atributo == 'text') {
      element.textContent = comando.valor;
    } else {
      element.style.setProperty(comando.atributo, comando.valor);
    }
  }

  ngAfterViewInit() {
    //let elementRef = this.tpl.elementRef;
    // outputs `template bindings={}`
    //console.log(elementRef.nativeElement.textContent);
}

  public cargarSinoptico() {
    if (!this.idSinoptico) {
      return;
    }
 
    this.servicioSinoptico.obtenerSinoptico(this.idSinoptico)
      .then(resp => this.asignarRespuesta(resp))
      .catch(err => this.reportarError(err));
  }

  private asignarRespuesta(resp: string) {

    this.divSinoptico.nativeElement.innerHTML = resp;

    if (this.idSinoptico == 'prueba') {
      const element = this.divSinoptico.nativeElement.querySelector('#aplicacion-dominio-topic-rect');
      element.addEventListener('click', this.onClick.bind(this));
    }
  }

  private onClick(e: any) {
    console.log(e);
    const elementRect = this.divSinoptico.nativeElement.querySelector('#aplicacion-dominio-topic-rect');
    const color = '#' + ((1<<24)*Math.random() | 0).toString(16);
    elementRect.style.setProperty('fill', color);

    const elementText = this.divSinoptico.nativeElement.querySelector('#aplicacion-dominio-topic-texto'); 
    elementText.textContent = color;

    const elementBd = this.divSinoptico.nativeElement.querySelector('#base-datos');
    elementBd.style.display = elementBd.style.display == 'none' ? 'block' : 'none';

  }

  private reportarError(err: any): void {
    this.esperando = false;
    let mensaje = 'Error indefinido';
    if (err.message) {
      mensaje = err.message;
    } else if (err.error) {
      mensaje = err.error.message;
    } else if (typeof err === 'string') {
      mensaje = err;
    }

    this.router.navigateByUrl('/error', { state: { mensaje: mensaje } });
  }

}
