import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinopticoComponent } from './sinoptico.component';

describe('SinopticoComponent', () => {
  let component: SinopticoComponent;
  let fixture: ComponentFixture<SinopticoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinopticoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinopticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
