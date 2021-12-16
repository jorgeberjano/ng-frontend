import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { GesService } from 'projects/ges-crud/src/lib/servicios/ges.service';
import { ConfigService } from 'projects/ges-crud/src/lib/servicios/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ng-crud';
  @Input() esperando = true;  
  @Input() seDebeMostrarLogin = true;
  metadatos: Array<object>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private servicioGes: GesService,
    private configService: ConfigService) {
  }

  ngOnInit() {
    this.configService.loadConfig();

    if (localStorage.getItem('token')) {
      this.seDebeMostrarLogin = false;
    }

    this.servicioGes.obtenerContexto()
      .then(ctx => {
        this.esperando = false;
        ctx.setPersonalizacionConulta('personas', { rutaEdicion: '/edicion_persona' });
        this.servicioGes.contexto = ctx;
        this.metadatos = ctx.metadatos;
      })
      .catch(e => {
        this.esperando = false;
        this.reportarError(e)
      });
  }

  public loginRealizado(usuario: string) {
    console.log("Se ha logado el usuario: " + usuario);
    this.seDebeMostrarLogin = false;
  }

  private reportarError(err: any): void {
    const mensaje = this.servicioGes.contexto.getMensajeError(err);   
    
    this.router.navigate(['/error'], { relativeTo: this.route, state: { mensaje: mensaje } });
  }
}
