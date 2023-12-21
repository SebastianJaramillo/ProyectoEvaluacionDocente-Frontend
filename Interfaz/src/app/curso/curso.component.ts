import { Component, OnInit } from '@angular/core';
import { CursosService } from '../cursos.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css'],
})
export class CursoComponent implements OnInit {
  cursos: any[] = [];
  curso: any = {};
  alumnoId: any;

  constructor(
    private cursosService: CursosService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.alumnoId = params['alumnoId'];
      console.log(params['alumnoId']);
      this.cargarCursosEstudiante(this.alumnoId);
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

  salir() {
    this.router.navigate(['iniciar-sesion']);
  }

  cargarCursosEstudiante(id: string) {
    this.cursosService.obtenerCursosPorAlumnos(id).subscribe(
      (data) => {
        this.cursos = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  verCurso(id: number) {
    this.cursosService.getCursosById(id).subscribe(
      (data) => {
        this.curso = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  editarCurso(id: number) {
    this.cursosService.getCursosById(id).subscribe(
      (data) => {
        this.curso = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  guardarCurso() {
    if (this.curso && this.curso.id) {
      // Editar curso existente
      this.cursosService.updateCurso(this.curso.id, this.curso).subscribe(
        (data) => {
          console.log('Curso actualizado:', data);
          this.resetForm();
          this.getAllCursos();
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      // Crear nuevo curso
      if (this.curso) {
        this.cursosService.createCurso(this.curso).subscribe(
          (data) => {
            console.log('Curso creado:', data);
            this.resetForm();
            this.getAllCursos();
          },
          (error) => {
            console.error(error);
          }
        );
      }
    }
  }

  eliminarCurso(id: number) {
    this.cursosService.deleteCurso(id).subscribe(
      () => {
        console.log('Curso eliminado');
        this.getAllCursos();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  private resetForm() {
    this.curso = {};
  }
}
