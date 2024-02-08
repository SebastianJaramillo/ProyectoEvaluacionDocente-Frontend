import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodoFormAdminComponent } from './periodo-form-admin.component';

describe('PeriodoFormAdminComponent', () => {
  let component: PeriodoFormAdminComponent;
  let fixture: ComponentFixture<PeriodoFormAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PeriodoFormAdminComponent]
    });
    fixture = TestBed.createComponent(PeriodoFormAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
