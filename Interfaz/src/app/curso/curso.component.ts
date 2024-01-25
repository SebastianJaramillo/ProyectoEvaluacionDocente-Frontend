import { Component, OnInit } from '@angular/core';
import { CursosService } from '../services/curso/cursos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnoService } from '../services/alumno/alumno.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css'],
})
export class CursoComponent implements OnInit {
  cursos: any[] = [];
  curso: any = {};
  id: any;

  constructor(
    private cursosService: CursosService,
    private alumnoService: AlumnoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.cargarCursosEstudiante(atob(this.id));
    });
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

  cargarCursosEstudiante(id: string) {
    this.alumnoService.findByAlumno(id).subscribe(
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
