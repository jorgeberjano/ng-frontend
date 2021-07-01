import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionCamposComponent } from './configuracion-campos.component';

describe('ConfiguracionCamposComponent', () => {
  let component: ConfiguracionCamposComponent;
  let fixture: ComponentFixture<ConfiguracionCamposComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguracionCamposComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracionCamposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
