import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodoAdminComponent } from './periodo-admin.component';

describe('PeriodoAdminComponent', () => {
  let component: PeriodoAdminComponent;
  let fixture: ComponentFixture<PeriodoAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PeriodoAdminComponent]
    });
    fixture = TestBed.createComponent(PeriodoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
