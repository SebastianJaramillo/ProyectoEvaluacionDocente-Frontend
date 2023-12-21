import { Component, OnInit } from '@angular/core';
import { CursosService } from '../cursos.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-alumno-materia',
  templateUrl: './alumno-materia.component.html',
  styleUrls: ['./alumno-materia.component.css']
})
export class AlumnoMateriaComponent implements OnInit {
  alumnos: any[] = [];
  alumno: any = {};
  mostrarPreguntas = false;
  constructor(private cursosService: CursosService,private router: Router) { }
  ngOnInit(): void {
    this.getAllCursos();
  }
  calificar() {
    this.mostrarPreguntas = true;
    // Aquí puedes hacer cualquier otra lógica relacionada con la calificación
  }
  getAllCursos() {
    this.cursosService.getAllCursos().subscribe(
      (data) => {
        this.alumnos = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  verAlumno(id: number) {
    this.cursosService.getCursosById(id).subscribe(
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
  editarAlumno(id: number) {
    this.cursosService.getCursosById(id).subscribe(
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
      this.cursosService.updateCursos(this.alumno.id, this.alumno).subscribe(
        (data) => {
          console.log('Alumno actualizado:', data);
          this.resetForm();
          this.getAllCursos();
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      // Crear nuevo alumno
      this.cursosService.createCursos(this.alumno).subscribe(
        (data) => {
          console.log('Alumno creado:', data);
          this.resetForm();
          this.getAllCursos();
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  eliminarAlumno(id: number) {
    this.cursosService.deleteCursos(id).subscribe(
      () => {
        console.log('Alumno eliminado');
        this.getAllCursos();
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
