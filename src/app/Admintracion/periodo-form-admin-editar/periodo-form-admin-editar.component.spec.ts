import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodoFormAdminEditarComponent } from './periodo-form-admin-editar.component';

describe('PeriodoFormAdminEditarComponent', () => {
  let component: PeriodoFormAdminEditarComponent;
  let fixture: ComponentFixture<PeriodoFormAdminEditarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PeriodoFormAdminEditarComponent]
    });
    fixture = TestBed.createComponent(PeriodoFormAdminEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
