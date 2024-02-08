import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionDirectivaComponent } from './evaluacion-directiva.component';

describe('EvaluacionDirectivaComponent', () => {
  let component: EvaluacionDirectivaComponent;
  let fixture: ComponentFixture<EvaluacionDirectivaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvaluacionDirectivaComponent]
    });
    fixture = TestBed.createComponent(EvaluacionDirectivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
