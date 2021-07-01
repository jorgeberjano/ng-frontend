import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionModalComponent } from './seleccion-modal.component';

describe('SeleccionModalComponent', () => {
  let component: SeleccionModalComponent;
  let fixture: ComponentFixture<SeleccionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
