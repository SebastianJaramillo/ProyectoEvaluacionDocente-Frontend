import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocenteAsignacionComponent } from './docente-asignacion.component';

describe('DocenteAsignacionComponent', () => {
  let component: DocenteAsignacionComponent;
  let fixture: ComponentFixture<DocenteAsignacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocenteAsignacionComponent]
    });
    fixture = TestBed.createComponent(DocenteAsignacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
