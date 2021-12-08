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
  metadatos: Array<object>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private servicioGes: GesService,
    private configService: ConfigService) {
  }

  ngOnInit() {
    this.configService.loadConfig();

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

  private reportarError(err: any): void {
    const mensaje = this.servicioGes.contexto.getMensajeError(err);   
    
    this.router.navigate(['/error'], { relativeTo: this.route, state: { mensaje: mensaje } });
  }
}
