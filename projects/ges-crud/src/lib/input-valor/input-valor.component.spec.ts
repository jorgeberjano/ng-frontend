import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputValorComponent } from './input-valor.component';

describe('InputValorComponent', () => {
  let component: InputValorComponent;
  let fixture: ComponentFixture<InputValorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputValorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputValorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
