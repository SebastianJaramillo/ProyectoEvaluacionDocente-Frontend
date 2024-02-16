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
  formId: any;
  funcion: any = {};
  periodo: any = {};
  eval: any = {};
  desactivado: any;

  constructor(
    private docenteService: DocenteService,
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
      
      switch (this.funcId) {
        case 'DOC':
          this.funcId = 'DOCENCIA';
          break;
        case 'VIN':
          this.funcId = 'VINCULACION';
          break;
        case 'GES':
          this.funcId = 'GESTION';
          break;
        case 'INV':
          this.funcId = 'INVESTIGACION';
          break;
        default:
          console.log('No se encontró función');
      }

      this.findEvaluacion(this.evalId);
    });
  }

  findByFuncion(id: string) {
    this.docenteService.findFuncionDirector(id).subscribe(
      (data) => {
        this.docentes = data.filter((docente, index, self) => 
          docente.docId !== atob(this.id) && self.findIndex(d => d.docId === docente.docId) === index
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }

  evaluacion(id: any) {
    switch (this.funcId) {
      case 'DOCENCIA':
        this.formId = 10;
        break;
      case 'VINCULACION':
        this.formId = 11;
        break;
      case 'GESTION':
        this.formId = 12;
        break;
      case 'INVESTIGACION':
        this.formId = 13;
        break;
      default:
        console.log('No se encontró función');
    }

    this.router.navigate(['docentes-preguntas', this.id, btoa(id), this.formId, this.evalId, btoa(this.funcId)]);  
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
}
