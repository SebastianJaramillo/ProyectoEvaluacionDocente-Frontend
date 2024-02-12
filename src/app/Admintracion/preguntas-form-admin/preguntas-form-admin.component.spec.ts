import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreguntasFormAdminComponent } from './preguntas-form-admin.component';

describe('PreguntasFormAdminComponent', () => {
  let component: PreguntasFormAdminComponent;
  let fixture: ComponentFixture<PreguntasFormAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreguntasFormAdminComponent]
    });
    fixture = TestBed.createComponent(PreguntasFormAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
