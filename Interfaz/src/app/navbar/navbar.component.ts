import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IgxNavigationDrawerComponent } from 'igniteui-angular';
import { AlumnoService } from '../services/alumno/alumno.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  @ViewChild('drawer', { static: true }) drawer!: IgxNavigationDrawerComponent;

  toggleDrawer() {
    this.drawer.toggle();
  }
  id: any;
  alumno: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alumnoService: AlumnoService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      //this.findEstudiante(this.id);
    });
  }
  
  findEstudiante(id: string) {
    this.alumnoService.getAlumnoById(id).subscribe(
      (data) => {
        this.alumno = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  salir() {
    this.router.navigate(['iniciar-sesion']);
  }
}
