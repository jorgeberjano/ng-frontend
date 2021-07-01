import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorFotoComponent } from './editor-foto.component';

describe('EditorFotoComponent', () => {
  let component: EditorFotoComponent;
  let fixture: ComponentFixture<EditorFotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorFotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorFotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
