import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AuthInterceptorService } from './servicios/auth-interceptor.service';

import { ConfiguracionCamposComponent } from './configuracion-campos/configuracion-campos.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { ConsultaBotoneraComponent } from './consulta-botonera/consulta-botonera.component';
import { EditorBotoneraComponent } from './editor-botonera/editor-botonera.component';
import { EditorCamposComponent } from './editor-campos/editor-campos.component';
import { EditorEntidadComponent } from './editor-entidad/editor-entidad.component';
import { EditorValorComponent } from './editor-valor/editor-valor.component';
import { ElementoCampoComponent } from './elemento-campo/elemento-campo.component';
import { ErrorComponent } from './error/error.component';
import { EsperandoComponent } from './esperando/esperando.component';
import { FiltroComponent } from './filtro/filtro.component';
import { FiltroCondicionComponent } from './filtro-condicion/filtro-condicion.component';
import { GrupoCamposComponent } from './grupo-campos/grupo-campos.component';
import { InputValorComponent } from './input-valor/input-valor.component';
import { PaginadorComponent } from './paginador/paginador.component';
import { RejillaDatosComponent } from './rejilla-datos/rejilla-datos.component';
import { SeleccionModalComponent } from './seleccion-modal/seleccion-modal.component';
import { GesService } from './servicios/ges.service';
import { GesServiceModule } from './servicios/ges-service.module';
import { ConfirmacionModalComponent } from './confirmacion-modal/confirmacion-modal.component';
import { ConfigService } from './servicios/config.service';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';

@NgModule({
  declarations: [
    ConfiguracionCamposComponent,
    ConsultaComponent,
    ConsultaBotoneraComponent,
    EditorBotoneraComponent,
    EditorEntidadComponent,
    EditorCamposComponent,
    EditorValorComponent,
    ElementoCampoComponent,
    ErrorComponent,
    EsperandoComponent,
    FiltroComponent,
    FiltroCondicionComponent,
    GrupoCamposComponent,
    InputValorComponent,
    PaginadorComponent,
    RejillaDatosComponent,
    SeleccionModalComponent,
    ConfirmacionModalComponent,
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    GesServiceModule.forRoot(),
    BrowserModule,
    FontAwesomeModule,
    NgbModule,
    NgbDropdownModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule
  ],
  entryComponents: [
    SeleccionModalComponent,
    ConfirmacionModalComponent
  ],
  exports: [
    ConfiguracionCamposComponent,
    ConsultaComponent,
    ConsultaBotoneraComponent,
    EditorBotoneraComponent,
    EditorCamposComponent,
    EditorEntidadComponent,
    EditorValorComponent,
    ElementoCampoComponent,
    ErrorComponent,
    EsperandoComponent,
    FiltroComponent,
    FiltroCondicionComponent,
    GrupoCamposComponent,
    InputValorComponent,
    PaginadorComponent,
    RejillaDatosComponent,
    SeleccionModalComponent,
    ConfirmacionModalComponent
  ],
  providers: [
    GesService,
    ConfigService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ]
})
export class GesCrudModule {  
}
