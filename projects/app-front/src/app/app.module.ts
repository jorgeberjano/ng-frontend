import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GesCrudModule } from 'ges-crud';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { EditorEntidadComponent } from 'ges-crud';
import { ErrorComponent } from 'ges-crud';
import { FiltroComponent } from 'ges-crud';
import { ConfiguracionCamposComponent } from 'ges-crud';
import { GesServiceModule } from 'projects/ges-crud/src/lib/servicios/ges-service.module';
import { MantenimientoComponent } from './mantenimiento/mantenimiento.component';
import { EditorPersonaComponent } from './editor-persona/editor-persona.component';
import { EditorFotoComponent } from './editor-foto/editor-foto.component';
import { SinopticoComponent } from './sinoptico/sinoptico.component';
import { ConfigService } from 'projects/ges-crud/src/lib/servicios/config.service';

const appRoutes: Routes = [
  { path: 'crud/:idConsulta', component: MantenimientoComponent },
  { path: 'edicion/:idConsulta/:clave', component: EditorEntidadComponent },
  { path: 'edicion_persona/:idConsulta/:clave', component: EditorPersonaComponent },
  { path: 'creacion/:idConsulta', component: EditorEntidadComponent },
  { path: 'filtro/:idConsulta', component: FiltroComponent },
  { path: 'configuracion/:idConsulta', component: ConfiguracionCamposComponent },
  { path: 'sinoptico/:idSinoptico', component: SinopticoComponent },
  { path: 'error', component: ErrorComponent },
// { path: '**', component: PageNotFoundComponent }
];

export const configFactory = (configService: ConfigService) => {
  return () => configService.loadConfig();
};

@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: configFactory,
      deps: [ConfigService],
      multi: true
    }
   ],
  declarations: [
    AppComponent,    
    MenuComponent,
    MantenimientoComponent,
    EditorPersonaComponent,
    EditorFotoComponent,
    SinopticoComponent
  ],
  imports: [
    GesCrudModule,
    GesServiceModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    BrowserModule,
    AngularFontAwesomeModule,
    FontAwesomeModule,
    NgbModule,
    NgbDropdownModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule    
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
