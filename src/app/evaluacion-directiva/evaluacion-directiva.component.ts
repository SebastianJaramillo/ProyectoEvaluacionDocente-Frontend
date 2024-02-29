import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DocenteService } from '../services/docente/docente.service';
import { FuncionService } from '../services/funcion/funcion.service';
import { EvaluacionService } from '../services/evaluacion/evaluacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-evaluacion-directiva',
  templateUrl: './evaluacion-directiva.component.html',
  styleUrls: ['./evaluacion-directiva.component.css'],
})
export class EvaluacionDirectivaComponent implements OnInit {
  docentes: any[] = [];
  docEvaluaciones: any[] = [];
  docente: any = {};
  id: any;
  idJefe: any;
  evalId: any;
  funcId: any;
  funcIdAux: any;
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

      const role = localStorage.getItem('role');
      if (role && role === 'DOCENTE') {
        this.findDirector(atob(this.id));
      } else {
        this.mensaje('Acceso denegado. Vuelva a iniciar sesión.');
        localStorage.clear();
        this.router.navigate(['']);
      }

      this.evalId = params['evalId'];
      this.funcId = atob(params['funcId']);
      this.funcIdAux = params['funcId'];
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
      this.findByEvaluador(atob(this.id));
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

  findDirector(id: string) {
    this.docenteService.findDirector(id).subscribe(
      (data) => {
        this.docentes = data;
        if (this.docentes.length <= 0) {
          this.mensaje('Acceso denegado. Vuelva a iniciar sesión.');
          localStorage.clear();
          this.router.navigate(['']);
        }
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

    this.router.navigate(['docentes-preguntas', this.id, btoa(id), this.formId, this.evalId, this.funcIdAux]);  
  }

  findByEvaluador(docEvaluador: string) {
    this.docenteService.findByEvaluador(docEvaluador).subscribe(
      (data) => {
        this.docEvaluaciones = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  findDescripcion(docIdDocente: string): boolean | undefined {
    return this.docEvaluaciones.find(e => e.docEvaluador === atob(this.id) && e.docEvaluado === docIdDocente);
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

  mensaje(texto: any) {
    Swal.fire({
      title: 'Error',
      text: texto,
      icon: 'error',
      confirmButtonText: 'Aceptar',
      width: '350px',
    });
  }
}
