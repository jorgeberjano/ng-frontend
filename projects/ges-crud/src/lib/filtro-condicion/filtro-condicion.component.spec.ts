import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroCondicionComponent } from './filtro-condicion.component';

describe('FiltroCondicionComponent', () => {
  let component: FiltroCondicionComponent;
  let fixture: ComponentFixture<FiltroCondicionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroCondicionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroCondicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
