import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarCoordinadorComponent } from './seleccionar-coordinador.component';

describe('SeleccionarCoordinadorComponent', () => {
  let component: SeleccionarCoordinadorComponent;
  let fixture: ComponentFixture<SeleccionarCoordinadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeleccionarCoordinadorComponent]
    });
    fixture = TestBed.createComponent(SeleccionarCoordinadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
