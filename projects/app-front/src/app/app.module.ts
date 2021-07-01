import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
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

@NgModule({
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
    NgbModule,
    NgbDropdownModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
