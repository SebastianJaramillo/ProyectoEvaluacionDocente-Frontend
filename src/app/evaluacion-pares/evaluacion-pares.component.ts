import { Component, OnInit } from '@angular/core';
import { DocenteService } from '../services/docente/docente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EvaluacionService } from '../services/evaluacion/evaluacion.service';
import { FuncionService } from '../services/funcion/funcion.service';

@Component({
  selector: 'app-evaluacion-pares',
  templateUrl: './evaluacion-pares.component.html',
  styleUrls: ['./evaluacion-pares.component.css']
})
export class EvaluacionParesComponent implements OnInit {
  docentes: any[] = [];
  docentesFuncion: any[] = [];
  docente: any = {};
  periodo: any = {};
  eval: any = {};
  funcion: any = {};
  id: any;
  idJefe: any;
  evalId: any;
  formId: any;
  funcId: any;
  desactivado: any;

  constructor(
    private docenteService: DocenteService,
    private evaluacionService: EvaluacionService,
    private funcionService: FuncionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.evalId = params['evalId'];
      this.funcId = atob(params['funcId']);      
      this.findActividad(this.funcId);
      this.findByJefe(atob(this.id));
      this.findEvaluacion(this.evalId);
    });
  }

  findByJefe(id: string) {
    this.docenteService.findByJefe(id).subscribe(
      (data) => {
        this.docentes = data;
        this.docentes.sort((a, b) => {
          if (a.docente.apellidos < b.docente.apellidos) {
            return -1;
          }
          if (a.docente.apellidos > b.docente.apellidos) {
            return 1;
          }
          return 0;
        });
      },
      (error) => {
        console.error(error);
      }
    );
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

  findActividad(id: string): any {
    this.funcionService.findById(id).subscribe(
      (data) => {
        this.funcion = data;
        this.funcion.descripcion = this.funcion.descripcion.toUpperCase();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  evaluacion(id: any) {
    switch (this.funcion.descripcion) {
      case 'DOCENCIA':
        this.formId = 6;
        break;
      case 'VINCULACION':
        this.formId = 7;
        break;
      case 'GESTION':
        this.formId = 8;
        break;
      case 'INVESTIGACION':
        this.formId = 9;
        break;
      default:
        console.log('No se encontró función');
    }

    this.router.navigate(['docentes-preguntas', this.id, btoa(id), this.formId, this.evalId, btoa(this.funcId)]);  
  }
}