import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { DragDropModule } from '@angular/cdk/drag-drop';

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
    SeleccionModalComponent
  ],
  imports: [
    GesServiceModule.forRoot(),
    BrowserModule,
    AngularFontAwesomeModule,
    NgbModule,
    NgbDropdownModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule
  ],
  entryComponents: [
    SeleccionModalComponent
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
    SeleccionModalComponent
  ],
  providers: [
    GesService
  ]
})
export class GesCrudModule {  
}
