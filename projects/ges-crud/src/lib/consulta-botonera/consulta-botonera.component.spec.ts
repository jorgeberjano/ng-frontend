import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaBotoneraComponent } from './consulta-botonera.component';

describe('ConsultaBotoneraComponent', () => {
  let component: ConsultaBotoneraComponent;
  let fixture: ComponentFixture<ConsultaBotoneraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaBotoneraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaBotoneraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
