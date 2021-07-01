import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejillaDatosComponent } from './rejilla-datos.component';

describe('RejillaDatosComponent', () => {
  let component: RejillaDatosComponent;
  let fixture: ComponentFixture<RejillaDatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejillaDatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejillaDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
