import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';
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

  constructor(
    private router: Router,
    private alumnoService: AlumnoService,
    private docenteService: DocenteService
  ) {}

  ngOnInit(): void {
    this.id = localStorage.getItem('idUser');
    this.role = localStorage.getItem('role');
    this.evalId = localStorage.getItem('evalId');

    if (this.id && this.role && this.evalId) {
      switch (this.role) {
        case 'DOCENTE':
          this.findDocente(atob(this.id));
          break;
        case 'ESTUDIANTE':
          this.findEstudiante(atob(this.id));
          break;
        default:
          console.log('No se encontró rol');
      }
    } else {
      this.router.navigate(['iniciar-sesion']);
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
    localStorage.removeItem('idUser');
    localStorage.removeItem('role');
    localStorage.removeItem('evalId');
    localStorage.removeItem('periodo');
    this.router.navigate(['iniciar-sesion']);
  }

  encuesta() {
    if(localStorage.getItem('periodo')) {
      if (this.role == 'ESTUDIANTE') {
        this.router.navigate(['cursos', this.id, this.evalId]);
      } else {
        this.router.navigate(['docentes', this.id, this.evalId]);
      }
    } else {
      this.mensaje('Seleccione el período');
      this.router.navigate(['periodo', this.id]);
    }
  }

  reportes() {
    this.router.navigate(['reporte', this.id, this.evalId]);
  }

  roles() {
    this.router.navigate(['rolesAdmin']);
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
