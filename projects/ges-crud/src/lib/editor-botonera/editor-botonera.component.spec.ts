import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorBotoneraComponent } from './editor-botonera.component';

describe('EditorBotoneraComponent', () => {
  let component: EditorBotoneraComponent;
  let fixture: ComponentFixture<EditorBotoneraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorBotoneraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorBotoneraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
