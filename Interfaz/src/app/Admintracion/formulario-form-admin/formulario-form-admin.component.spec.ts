import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioFormAdminComponent } from './formulario-form-admin.component';

describe('FormularioFormAdminComponent', () => {
  let component: FormularioFormAdminComponent;
  let fixture: ComponentFixture<FormularioFormAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioFormAdminComponent]
    });
    fixture = TestBed.createComponent(FormularioFormAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
