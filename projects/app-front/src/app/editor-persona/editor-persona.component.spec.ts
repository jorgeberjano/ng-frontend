import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorPersonaComponent } from './editor-persona.component';

describe('EditorPersonaComponent', () => {
  let component: EditorPersonaComponent;
  let fixture: ComponentFixture<EditorPersonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorPersonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
