import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
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

  respHetDoc: any[] = [];
  respAutDoc: any[] = [];
  respParDoc: any[] = [];
  respDirDoc: any[] = [];

  respAutInv: any[] = [];
  respParInv: any[] = [];
  respDirInv: any[] = [];

  respAutGes: any[] = [];
  respDirGes: any[] = [];

  respAutVin: any[] = [];
  respParVin: any[] = [];
  respDirVin: any[] = [];

  funcion: any = {};
  periodo: any = {};
  id: any;
  eval: any = {};
  evalId: any;
  desactivado: any;
  formId: any;

  horasDocencia: 0 = 0;
  horasInvestigacion: 0 = 0;
  horasGestion: 0 = 0;
  horasVinculacion: 0 = 0;

  totalHetDoc: number = 0;
  totalAutDoc: number = 0;
  totalParDoc: number = 0;
  totalDirDoc: number = 0;

  totalAutInv: number = 0;
  totalParInv: number = 0;
  totalDirInv: number = 0;

  totalAutGes: number = 0;
  totalDirGes: number = 0;

  totalAutVin: number = 0;
  totalParVin: number = 0;
  totalDirVin: number = 0;

  constructor(
    private docenteService: DocenteService,
    private evaluacionService: EvaluacionService,
    private formularioService: FormularioService,
    private funcionService: FuncionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.evalId = params['evalId'];
    });

    this.findByFechas();
    this.findDocente(atob(this.id));
        
    //this.deshabilitarBoton();
  }

  findByFechas() {
    this.evaluacionService.findByFechas().subscribe(
      (data) => {
        this.eval = data;
        this.evalId = this.eval.id;
        this.findPeriodo(this.eval.perId);
        this.findFunciones(atob(this.id));
      },
      (error) => {
        this.mensaje('Evaluación no se encuentra habilitada en estas fechas.');
        this.router.navigate(['periodo', this.id]);
      }
    );
  }

  findFunciones(id: string) {
    this.docenteService.findFunciones(id).subscribe(
      (data) => {
        this.docFunciones = data;
        this.docFunciones.forEach((item) => {
          switch (item.funcion.descripcion) {
            case 'Docencia':
              this.horasDocencia += item.horas;
              break;
            case 'Vinculacion':
              this.horasVinculacion += item.horas;
              break;
            case 'Gestion':
              this.horasGestion += item.horas;
              break;
            case 'Investigacion':
              this.horasInvestigacion += item.horas;
              break;
            default:
              console.log('No se encontró función');
          }
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

  deshabilitarBoton() {
    this.docenteService
      .findByEvaluacion(atob(this.id), atob(this.id), this.evalId)
      .subscribe(
        (data) => {
          this.desactivado = true;
        },
        (error) => {
          console.error(error);
        }
      );
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
