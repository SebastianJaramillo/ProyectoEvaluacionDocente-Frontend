import {
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { DocenteService } from '../services/docente/docente.service';
import { AlumnoService } from '../services/alumno/alumno.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  id: any;
  role: any;
  evalId: any;
  user: any = {};
  director: any;
  docFunciones: any[] = [];

  constructor(
    private router: Router,
    private alumnoService: AlumnoService,
    private docenteService: DocenteService
  ) {}

  ngOnInit(): void {
    this.id = localStorage.getItem('idUser');
    this.role = localStorage.getItem('role');

    if(localStorage.getItem('evalId') == null) {
      this.evalId = 0;
    } else {
      this.evalId = localStorage.getItem('evalId');  
    }

    if (this.id && this.role) {
      switch (this.role) {
        case 'DOCENTE':
          this.findDocente(atob(this.id));
          this.findFunciones(atob(this.id));
          break;
        case 'ESTUDIANTE':
          this.findEstudiante(atob(this.id));
          break;
        default:
          console.log('No se encontró rol');
      }
    } else {
      localStorage.clear();
      this.router.navigate(['']);
    }
  }

  findDocente(id: string): any {
    this.docenteService.findById(id).subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  findFunciones(id: any) {
    this.docenteService.findFunciones(id).subscribe(
      (data) => {
        this.docFunciones = data;
        this.director = this.docFunciones.some(
          (f) => f.funcion.rol === 'Director'
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }

  findEstudiante(id: string) {
    this.alumnoService.getAlumnoById(id).subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  salir() {
    localStorage.clear();
    this.router.navigate(['']);
  }

  encuesta() {
    if(localStorage.getItem('evalId') == null) {
      this.evalId = 0;
    } else {
      this.evalId = localStorage.getItem('evalId');  
    }

    if(this.evalId > 0) {
      if (this.role == 'ESTUDIANTE') {
        this.router.navigate(['cursos', this.id, this.evalId]);
      } else {
        this.router.navigate(['docentes', this.id, this.evalId]);
      }
    } else {
      this.mensaje('Seleccione un periodo');
      this.router.navigate(['periodo', this.id]);
    }
  }

  reportes() {
    this.router.navigate(['reporte', this.id, this.evalId]);
  }

  roles() {
    this.router.navigate(['rolesAdmin']);
  }

  listar() {
    this.router.navigate(['listarDocentes']);
  }

  sleep(ms: any) {
    return new Promise((resolve) => setTimeout(resolve, ms));
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
