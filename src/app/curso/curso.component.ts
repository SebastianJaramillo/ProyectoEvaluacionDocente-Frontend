import { Component, OnInit } from '@angular/core';
import { CursosService } from '../services/curso/cursos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnoService } from '../services/alumno/alumno.service';
import { EvaluacionService } from '../services/evaluacion/evaluacion.service';
import { DocenteService } from '../services/docente/docente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css'],
})
export class CursoComponent implements OnInit {
  cursos: any[] = [];
  curso: any = {};
  eval: any = {};
  docente: any = {};
  periodo: any = {};
  id: any;
  evalId: any;

  constructor(
    private cursosService: CursosService,
    private alumnoService: AlumnoService,
    private evaluacionService: EvaluacionService,
    private docenteService: DocenteService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.evalId = params['evalId'];
    });

    this.findPeriodo(this.evalId);
    this.cargarCursosEstudiante(atob(this.id), this.evalId);

    const role = localStorage.getItem('role');
    if (role && role === 'ESTUDIANTE') {   

    } else {
      this.mensaje('Acceso denegado. Vuelva a iniciar sesión.')
      localStorage.clear();
      this.router.navigate(['']);
    }
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

  findDocente(id: string): any {
    this.docenteService.findById(id).subscribe(
      (data) => {
        this.docente = data;
        return this.docente;
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

  evaluacion(alumnoId: any, cursoId: any, id: any) {
    this.router.navigate([
      'preguntas',
      alumnoId,
      btoa(cursoId),
      1,
      id,
      this.evalId,
    ]);
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
