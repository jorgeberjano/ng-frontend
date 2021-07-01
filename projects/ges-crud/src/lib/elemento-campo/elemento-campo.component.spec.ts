import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementoCampoComponent } from './elemento-campo.component';

describe('ElementoCampoComponent', () => {
  let component: ElementoCampoComponent;
  let fixture: ComponentFixture<ElementoCampoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementoCampoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementoCampoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
