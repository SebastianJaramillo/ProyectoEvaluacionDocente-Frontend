import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { EvaluacionService } from '../services/evaluacion/evaluacion.service';
import { UserService } from '../services/user/user.service';
import { NavbarService } from '../services/navbar/navbar.service';

@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.css'],
})
export class EvaluacionComponent implements OnInit {
  periodos: any[] = [];
  periodo: any = {};
  id: any;


  constructor(
    private evaluacionService: EvaluacionService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private NavbarService: NavbarService
  ) {}

  ngOnInit(): void {
    this.getAllPeriodos();
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

  }

  getAllPeriodos() {
    this.evaluacionService.getAllPeriodos().subscribe(
      (data) => {
        this.periodos = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  selectPeriodo() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.userService.findById(atob(this.id)).subscribe({
      next: (user) => {
        if (user && user.id) {
          if (user.role == 'ESTUDIANTE') {
            this.router.navigate(['cursos', this.id]);
          } else {
            this.router.navigate(['docentes', this.id]);
          }
        } else {
          console.error(
            'No se encontró usuario'
          );
        }
      },
      error: (user) => {
        console.error('Error al obtener usuario:', user);
      },
    });
  }
}
