import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorCamposComponent } from './editor-campos.component';

describe('EditorCamposComponent', () => {
  let component: EditorCamposComponent;
  let fixture: ComponentFixture<EditorCamposComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorCamposComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorCamposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
