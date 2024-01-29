import { Component, OnInit } from '@angular/core';
import { DocenteService } from '../services/docente/docente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EvaluacionService } from '../services/evaluacion/evaluacion.service';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.component.html',
  styleUrls: ['./docente.component.css']
})
export class DocenteComponent implements OnInit {
  docentes: any[] = [];
  docente: any = {};
  funciones: any[] = [];
  funcion: any = {};
  id: any;
  eval: any = {};
  evalId: any;
  desactivado: any;

  constructor(
    private docenteService: DocenteService,
    private evaluacionService: EvaluacionService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];    
      this.evalId = params['evalId'];  
    });

    this.findByFechas();
    this.deshabilitarBoton();
  }

  findByFechas() {
    this.evaluacionService.findByFechas().subscribe(  
      (data) => {
        this.eval = data;
        this.evalId = this.eval.id;
        this.findFunciones(atob(this.id));
      },
      (error) => {
        alert("Evaluación no se encuentra habilitada en estas fechas.")
        this.router.navigate(['periodo', this.id]);
      }
    );
  }

  findFunciones(id: string) {
    this.docenteService.findFunciones(id).subscribe(
      (data) => {
        this.funciones = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deshabilitarBoton() {
    this.docenteService.findByEvaluacion(atob(this.id), atob(this.id), this.evalId).subscribe(
      (data) => {
        this.desactivado = true;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  evaluacion(id: any, formId: any, funcId: any) {
    this.router.navigate(['docentes-preguntas', id, id, formId, btoa(funcId), this.evalId]);
  }

  evaluacionPares() {  
    this.router.navigate(['evaluacion-pares', this.id, this.evalId]);
  }
}
