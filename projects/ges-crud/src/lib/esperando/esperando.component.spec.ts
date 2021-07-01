import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsperandoComponent } from './esperando.component';

describe('EsperandoComponent', () => {
  let component: EsperandoComponent;
  let fixture: ComponentFixture<EsperandoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsperandoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsperandoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
