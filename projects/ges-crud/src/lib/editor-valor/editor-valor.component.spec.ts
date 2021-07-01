import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorValorComponent } from './editor-valor.component';

describe('EditorValorComponent', () => {
  let component: EditorValorComponent;
  let fixture: ComponentFixture<EditorValorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorValorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorValorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
