import { Component } from '@angular/core';
import { AlumnoService } from '../alumno.service';
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

  verAlumno2(alumnoId: number): void {
    // Redireccionar al componente "Asignar Alumno" con el ID del alumno
    this.router.navigate(['asignaralumnos', alumnoId]);
  }
  
  cargarCursos(alumnoId: string): void {
    this.router.navigate(['cursos', alumnoId]);
  }

  editarAlumno(id: number) {
    this.alumnoService.getAlumnoById(id).subscribe(
      (data) => {
        this.alumno = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  guardarAlumno() {
    if (this.alumno.id) {
      // Editar alumno existente
      this.alumnoService.updateAlumno(this.alumno.id, this.alumno).subscribe(
        (data) => {
          console.log('Alumno actualizado:', data);
          this.resetForm();
          this.getAllAlumnos();
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      // Crear nuevo alumno
      this.alumnoService.createAlumno(this.alumno).subscribe(
        (data) => {
          console.log('Alumno creado:', data);
          this.resetForm();
          this.getAllAlumnos();
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  eliminarAlumno(id: number) {
    this.alumnoService.deleteAlumno(id).subscribe(
      () => {
        console.log('Alumno eliminado');
        this.getAllAlumnos();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  private resetForm() {
    this.alumno = {};
  }
}
