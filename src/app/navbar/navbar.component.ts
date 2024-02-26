import { Component, ViewChild, OnInit, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { DocenteService } from '../services/docente/docente.service';
import { AlumnoService } from '../services/alumno/alumno.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  id: any;
  role: any;
  evalId: any;
  user: any ={};
  director: any;
  docFunciones: any[] = [];

  constructor(
    private router: Router,
    private alumnoService: AlumnoService,
    private docenteService: DocenteService,
  ) {}

  ngOnInit(): void {
    this.id = localStorage.getItem('idUser');
    this.role = localStorage.getItem('role');
    this.evalId = localStorage.getItem('evalId');

    if(this.id && this.role) {
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
      localStorage.removeItem('idUser');
      localStorage.removeItem('role');
      localStorage.removeItem('evalId');
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

  findFunciones(id: any) {
    this.docenteService.findFunciones(id).subscribe(
      (data) => {
        this.docFunciones = data;
        this.director = this.docFunciones.some(f => f.funcion.rol === 'Director');
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
    this.router.navigate(['iniciar-sesion']);
  }

  encuesta() {    
    if(this.role == "ESTUDIANTE") {
      this.router.navigate(['cursos', this.id, this.evalId]);
    } else {
      this.router.navigate(['docentes', this.id, this.evalId]);
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
}
