import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionParesComponent } from './evaluacion-pares.component';

describe('EvaluacionParesComponent', () => {
  let component: EvaluacionParesComponent;
  let fixture: ComponentFixture<EvaluacionParesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvaluacionParesComponent]
    });
    fixture = TestBed.createComponent(EvaluacionParesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
