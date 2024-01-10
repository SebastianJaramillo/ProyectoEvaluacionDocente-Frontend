import { Component } from '@angular/core';
import { AlumnoService } from '../services/alumno/alumno.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css'],
})
export class AlumnoComponent {
  alumnos: any[] = [];
  alumno: any = {};

  constructor(private alumnoService: AlumnoService, private router: Router) {}

  getAllAlumnos() {
    this.alumnoService.getAllAlumnos().subscribe(
      (data) => {
        this.alumnos = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  verAlumno(id: number) {
    this.alumnoService.getAlumnoById(id).subscribe(
      (data) => {
        this.alumno = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  cargarCursos(alumnoId: string): void {
    this.router.navigate(['cursos', alumnoId]);
  }
}
