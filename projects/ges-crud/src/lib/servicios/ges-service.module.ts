import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GesService } from './ges.service';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule
  ]
})
export class GesServiceModule { 

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: GesServiceModule,
      providers: [ GesService ]
    };
  }
}
