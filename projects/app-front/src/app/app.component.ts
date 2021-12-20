import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { GesService } from 'projects/ges-crud/src/lib/servicios/ges.service';
import { ConfigService } from 'projects/ges-crud/src/lib/servicios/config.service';
import { LoginService } from 'projects/ges-crud/src/lib/servicios/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ng-crud';
  @Input() estado: string = 'esperando';    
  metadatos: Array<object>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private servicioGes: GesService,
    private servicioLogin: LoginService,
    private configService: ConfigService) {
  }

  ngOnInit() {
    this.configService.loadConfig();

    if (!localStorage.getItem('token')) {
      this.estado = 'login';
    } else {
      this.obtenerContexto();
    }
  }

  private obtenerContexto() {
    this.servicioGes.obtenerContexto()
      .then(ctx => {
        this.estado = 'menu';
        ctx.setPersonalizacionConulta('personas', { rutaEdicion: '/edicion_persona' });
        this.servicioGes.contexto = ctx;
        this.metadatos = ctx.metadatos;
      })
      .catch(e => {
        this.estado = 'menu';
        this.reportarError(e)
      });
  }

  public esperandoLogin() {
    this.estado = 'esperando'
  }

  public loginRealizado(usuario: string) {

    console.log('Se ha logado el usuario: ' + usuario);
    this.estado = 'esperando';
    this.obtenerContexto();
  }

  public reportarError(err: any): void {
    const mensaje = this.servicioGes.contexto.getMensajeError(err);   
    
    this.router.navigate(['/error'], { relativeTo: this.route, state: { mensaje: mensaje } });
  }
}
