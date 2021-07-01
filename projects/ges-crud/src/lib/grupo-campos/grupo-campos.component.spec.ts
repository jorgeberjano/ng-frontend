import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoCamposComponent } from './grupo-campos.component';

describe('GrupoCamposComponent', () => {
  let component: GrupoCamposComponent;
  let fixture: ComponentFixture<GrupoCamposComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoCamposComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoCamposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
