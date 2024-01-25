import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreguntasDocenteComponent } from './preguntas-docente.component';

describe('PreguntasDocenteComponent', () => {
  let component: PreguntasDocenteComponent;
  let fixture: ComponentFixture<PreguntasDocenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreguntasDocenteComponent]
    });
    fixture = TestBed.createComponent(PreguntasDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
