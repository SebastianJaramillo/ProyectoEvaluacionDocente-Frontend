import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DocenteService } from '../services/docente/docente.service';
import { EvaluacionService } from '../services/evaluacion/evaluacion.service';
import { FormularioService } from '../services/formulario/formulario.service';
import { FuncionService } from '../services/funcion/funcion.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.component.html',
  styleUrls: ['./docente.component.css'],
})
export class DocenteComponent implements OnInit {
  docentes: any[] = [];
  docente: any = {};
  docFunciones: any[] = [];
  docEvaluaciones: any[] = [];

  funcion: any = {};
  periodo: any = {};
  id: any;
  eval: any = {};
  evalId: any;
  desactivado: any;
  formId: any;
  director: any;

  filtroSeleccionado: string = '';
  opcionesDeFiltro: string[] = ['COEVALUACION DIRECTIVA', 'AUTOEVALUACION'];

  constructor(
    private docenteService: DocenteService,
    private evaluacionService: EvaluacionService,
    private formularioService: FormularioService,
    private funcionService: FuncionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const role = localStorage.getItem('role');
    if (role && role === 'DOCENTE') {   

    } else {
      this.mensaje('Acceso denegado. Vuelva a iniciar sesión.')
      localStorage.clear();
      this.router.navigate(['']);
    }

    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.evalId = params['evalId'];
    });    
    
    this.findPeriodo(this.evalId);
    this.findFunciones(atob(this.id));
    this.findByEvaluacion(atob(this.id), atob(this.id), this.evalId);
    this.findDocente(atob(this.id));
    if(this.director) {
      this.filtroSeleccionado = 'COEVALUACION DIRECTIVA';
    } else {
      this.filtroSeleccionado = 'AUTOEVALUACION';
    }
  }

  findByEvaluacion(docEvaluado: string, docEvaluador: string, evalId: number) {
    this.docenteService.findByEvaluacion(docEvaluado, docEvaluador, evalId).subscribe(
      (data) => {
        this.docEvaluaciones = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  findDescripcion(docDescripcion: string): boolean {
    return this.docEvaluaciones.find(e => e.actividad === docDescripcion);
  }

  findFunciones(id: string) {
    this.docenteService.findFunciones(id).subscribe(
      (data) => {
        this.docFunciones = data;
        this.director = this.docFunciones.some(f => f.funcion.rol === 'Director');
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

  findDocente(id: string): any {
    this.docenteService.findById(id).subscribe(
      (data) => {
        this.docente = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  findRespuestas(preId: any, docEvaluado: any, evalId: number): Observable<any> {
    return this.formularioService.resultados(preId, docEvaluado, evalId);
  }

  evaluacion(id: any, funcId: any) {
    this.funcionService.findById(funcId).subscribe(
      (data) => {
        this.funcion = data;

        switch (this.funcion.descripcion) {
          case 'Docencia':
            this.formId = 2;
            break;
          case 'Vinculacion':
            this.formId = 3;
            break;
          case 'Gestion':
            this.formId = 4;
            break;
          case 'Investigacion':
            this.formId = 5;
            break;
          default:
            console.log('No se encontró función');
        }

        this.router.navigate([
          'docentes-preguntas',
          id,
          id,
          this.formId,
          this.evalId,
          btoa(funcId),
        ]);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  evaluacionPares(funcId: any) {
    this.router.navigate([
      'evaluacion-pares',
      this.id,
      this.evalId,
      btoa(funcId),
    ]);
  }

  evaluacionDirectiva(funcId: string) {
    this.router.navigate([
      'evaluacion-directiva',
      this.id,
      btoa(funcId),
      this.evalId,
    ]);
  }

  reportes() {
    this.router.navigate(['reporte', this.id, this.evalId]);
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
