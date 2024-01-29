import { Component, OnInit } from '@angular/core';
import { CursosService } from '../services/curso/cursos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnoService } from '../services/alumno/alumno.service';
import { EvaluacionService } from '../services/evaluacion/evaluacion.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css'],
})
export class CursoComponent implements OnInit {
  cursos: any[] = [];
  curso: any = {};
  eval: any = {};
  id: any;
  evalId: any;

  constructor(
    private cursosService: CursosService,
    private alumnoService: AlumnoService,
    private evaluacionService: EvaluacionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.findByFechas();
  }

  findByFechas() {
    this.evaluacionService.findByFechas().subscribe(  
      (data) => {
        this.eval = data;
        this.evalId = this.eval.id;
        this.cargarCursosEstudiante(atob(this.id), this.evalId);
      },
      (error) => {
        alert("Evaluación no se encuentra habilitada en estas fechas.")
        this.router.navigate(['periodo', this.id]);
      }
    );
  }

  getAllCursos() {
    this.cursosService.getAllCursos().subscribe(
      (data) => {
        this.cursos = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  cargarCursosEstudiante(id: string, evalId: any) {
    this.alumnoService.findByAlumno(id, evalId).subscribe(
      (data) => {
        this.cursos = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  evaluacion(alumnoId: any, cursoId: any, id: any) {  
    this.router.navigate(['preguntas', alumnoId, btoa(cursoId), 1, id]);
  }
}
