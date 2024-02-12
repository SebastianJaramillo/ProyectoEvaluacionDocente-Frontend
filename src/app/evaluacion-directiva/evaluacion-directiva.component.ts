import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DocenteService } from '../services/docente/docente.service';
import { FuncionService } from '../services/funcion/funcion.service';
import { EvaluacionService } from '../services/evaluacion/evaluacion.service';

@Component({
  selector: 'app-evaluacion-directiva',
  templateUrl: './evaluacion-directiva.component.html',
  styleUrls: ['./evaluacion-directiva.component.css'],
})
export class EvaluacionDirectivaComponent implements OnInit {
  docentes: any[] = [];
  docente: any = {};
  id: any;
  idJefe: any;
  evalId: any;
  funcId: any;
  funcion: any = {};
  periodo: any = {};
  eval: any = {};
  desactivado: any;

  constructor(
    private docenteService: DocenteService,
    private funcionService: FuncionService,
    private evaluacionService: EvaluacionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.evalId = params['evalId'];
      this.funcId = atob(params['funcId']);
      this.findByFuncion(this.funcId);
      this.findEvaluacion(this.evalId);
      this.findFuncionById(this.funcId);
    });
  }

  findByFuncion(id: string) {
    this.docenteService.findFuncionDirector(id).subscribe(
      (data) => {
        this.docentes = data.filter((docente) => docente.docId !== atob(this.id));
      },
      (error) => {
        console.error(error);
      }
    );
  }

  findFuncionById(id: string) {
    this.funcionService.findById(id).subscribe(
      (data) => {
        this.funcion = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  evaluacion(id: any, formId: any, funcId: any) {
    this.router.navigate([
      'docentes-preguntas',
      this.id,
      btoa(id),
      formId,
      btoa(funcId),
      this.evalId,
    ]);
  }

  findPeriodo(id: number): any {
    this.evaluacionService.getPeriodoById(id).subscribe(
      (data) => {
        this.periodo = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  findEvaluacion(id: number): any {
    this.evaluacionService.findEvaluacion(id).subscribe(
      (data) => {
        this.eval = data;
        this.findPeriodo(this.eval.perId);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  volver() {
    this.router.navigate(['docentes', this.id, this.evalId]);
  }
}
