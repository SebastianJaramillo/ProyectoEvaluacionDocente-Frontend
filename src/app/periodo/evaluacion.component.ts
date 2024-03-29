import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { EvaluacionService } from '../services/evaluacion/evaluacion.service';
import { UserService } from '../services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.css'],
})
export class EvaluacionComponent implements OnInit {
  periodos: any[] = [];
  periodo: any = {};
  id: any;
  eval: any = {};
  evalId: any;
  idPeriodo: number = 0;

  constructor(
    private evaluacionService: EvaluacionService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idPeriodo = 0;
    this.getAllPeriodos();
  }

  findByFechas(id: number) {
    if (id > 0) {
      this.evaluacionService.findByFechas(id).subscribe(
        (data) => {
          this.selectPeriodo();
        },
        (error) => {
          this.mensaje(
            'Evaluación no se encuentra habilitada en estas fechas.'
          );
          localStorage.removeItem('evalId');
          this.router.navigate(['periodo', this.id]);
        }
      );
    } else {
      this.mensaje('Seleccione un periodo');
    }
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
          this.evalId = this.idPeriodo;
          localStorage.setItem('evalId', this.evalId);
          if (user.role == 'ESTUDIANTE') {
            this.router.navigate(['cursos', this.id, this.evalId]);
          } else {
            this.router.navigate(['docentes', this.id, this.evalId]);
          }
        } else {
          console.error('No se encontró usuario');
        }
      },
      error: (user) => {
        console.error('Error al obtener usuario:', user);
      },
    });
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
