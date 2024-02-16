import { Component, ViewChild, OnInit, Output, EventEmitter} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IgxNavigationDrawerComponent } from 'igniteui-angular';
import { UserService } from '../services/user/user.service';
import { DocenteService } from '../services/docente/docente.service';
import { AlumnoService } from '../services/alumno/alumno.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  @Output() newItemEvent = new EventEmitter<string>();
  


  addNewItem(value: string) {
    this.newItemEvent.emit(value);
  }

  @ViewChild('drawer', { static: true }) drawer!: IgxNavigationDrawerComponent;

  toggleDrawer() {
    this.drawer.toggle();
  }
  id: any;
  role: any;
  evalId: any;
  user: any ={};

  constructor(
    private router: Router,
    private userService: UserService,
    private alumnoService: AlumnoService,
    private docenteService: DocenteService,
  ) {}

  ngOnInit(): void {
    this.id = localStorage.getItem('idUser');
    this.role = localStorage.getItem('role');

    if(this.id && this.role) {
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
    this.evalId = localStorage.getItem('evalId');
    if(this.role == "ESTUDIANTE") {
      this.router.navigate(['cursos', this.id, this.evalId]);
    } else {
      this.router.navigate(['docentes', this.id, this.evalId]);
    }
  }

  reportes() {
    this.router.navigate(['reporte', this.id, this.evalId]);
  }
}
