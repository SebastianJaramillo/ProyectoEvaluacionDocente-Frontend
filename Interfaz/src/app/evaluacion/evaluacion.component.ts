import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { EvaluacionService } from '../services/evaluacion/evaluacion.service';

@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.css'],
})
export class EvaluacionComponent implements OnInit {
  periodos: any[] = [];
  periodo: any = {};
  alumnoId: any;

  constructor(
    private evaluacionService: EvaluacionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAllPeriodos();
  }

  getAllPeriodos() {
    this.evaluacionService.getAllPeriodos().subscribe(
      (data) => {
        this.periodos = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  selectPeriodo() {
    this.route.params.subscribe((params) => {
      this.alumnoId = params['alumnoId'];   
      console.log(params['alumnoId']);
    });
    this.router.navigate(['cursos', this.alumnoId]);
  }
}
