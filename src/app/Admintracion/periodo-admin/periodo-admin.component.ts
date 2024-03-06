import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EvaluacionService } from 'src/app/services/evaluacion/evaluacion.service';
import { PeriodoFormAdminComponent } from '../periodo-form-admin/periodo-form-admin.component';
import { Evaluacion } from '../../periodo/evaluacion.model';
import { Periodo } from 'src/app/periodo/periodo.model';
import Swal from 'sweetalert2';
import { PeriodoFormAdminEditarComponent } from '../periodo-form-admin-editar/periodo-form-admin-editar.component';

@Component({
  selector: 'app-periodo-admin',
  templateUrl: './periodo-admin.component.html',
  styleUrls: ['./periodo-admin.component.css'],
})
export class PeriodoAdminComponent implements OnInit {
  periodos: Periodo[] = [];
  evaluaciones: any[] = [];
  evaluacion: any = {};
  periodo: any = {};
  id: any;
  eval: any = {};
  evalId: any;

  periodoForm!: FormGroup;
  modoEdicion: boolean = false;

  constructor(
    private evaluacionService: EvaluacionService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    const role = localStorage.getItem('role');
    if (role && role === 'ADMIN') {
    } else {
      this.mensaje('Acceso denegado. Vuelva a iniciar sesión.');
      localStorage.clear();
      this.router.navigate(['']);
    }

    this.periodoForm = this.fb.group({
      id: [''],
      descripcion: [''],
      estado: [''],
    });
    this.getAllEvaluaciones();
  }

  getAllEvaluaciones() {
    this.evaluacionService.getAllEvaluaciones().subscribe(
      (data) => {
        this.evaluaciones = data;
      },
      (error) => {
        console.error(error);
      }
    );
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

  abrirFormulario() {
    const dialogRef = this.dialog.open(PeriodoFormAdminComponent, {
      width: '550px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        if (result.fechaFin && result.fechaInicio) {
          this.evaluacion.evalFechaFin = new Date(result.fechaFin);
          this.evaluacion.evalFechaInicio = new Date(result.fechaInicio);
          this.evaluacion.estado = 'ACTIVO';
          this.evaluacion.perId = result.idPeriodo;
          this.evaluacionService.createEvaluacion(this.evaluacion).subscribe(
            (data) => {
              this.getAllEvaluaciones();
            },
            (error) => {
              console.error(error);
            }
          );
        }
      } else {
        console.log('El diálogo se cerró sin enviar datos');
      }
    });
  }

  actualizarPeriodo(evaluacion: any) {
    const dialogRef = this.dialog.open(PeriodoFormAdminEditarComponent, {
      width: '550px',
      data: evaluacion
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        if (result.fechaFin && result.fechaInicio) {
          this.evaluacion.evalFechaFin = new Date(result.fechaFin);
          this.evaluacion.evalFechaInicio = new Date(result.fechaInicio);
          this.evaluacion.estado = 'ACTIVO';
          this.evaluacion.perId = result.idPeriodo;
          this.evaluacion.id = result.id;
          this.evaluacionService.updateEvaluacion(this.evaluacion).subscribe(
            (data) => {
              this.getAllEvaluaciones();
            },
            (error) => {
              console.error(error);
            }
          );
        }
      } else {
        console.log('El diálogo se cerró sin enviar datos');
      }
    });
  }

  eliminarPeriodo(id: number) {
    this.evaluacionService.findEvaluacion(id).subscribe({
      next: (data) => {
        this.evaluacion = data;
        if (this.evaluacion.estado == 'ACTIVO') {
          this.mensaje('No es posible eliminar una evaluacion activa');
        } else {
          this.confirmacion('¿Desea eliminar la evaluación?').then((result) => {
            if (result.isConfirmed) {
              this.evaluacionService.deleteEvalucion(id).subscribe({
                next: (data) => {
                  this.exito('Se eliminó la evaluación correctamente');
                  this.getAllEvaluaciones();
                },
                error: (error) => {
                  console.error(
                    'Error al eliminar el estado de la evaluación',
                    error
                  );
                },
              });
            }
          });
        }
        this.getAllEvaluaciones();
      },
      error: (error) => {
        console.error('Error al actualizar el estado de la evaluación', error);
      },
    });
  }

  cambiarEstado(id: number, perId: number, estadoActual: string): void {
    if (estadoActual == 'ACTIVO') {
      estadoActual = 'INACTIVO';
    } else {
      estadoActual = 'ACTIVO';
    }

    this.evaluacionService.updateEstadoEvaluacion(id, estadoActual).subscribe({
      next: (data) => {
        this.evaluacionService
          .updateEstadoPeriodo(perId, estadoActual)
          .subscribe({
            next: (data) => {
              this.exito('Estado cambiado correctamente');
              this.getAllEvaluaciones();
            },
            error: (error) => {
              console.error('Error al actualizar el estado del periodo', error);
            },
          });
      },
      error: (error) => {
        console.error('Error al actualizar el estado de la evaluación', error);
      },
    });
  }

  getEstadoAsBoolean(estado: string): boolean {
    if (estado == 'ACTIVO') {
      return true;
    } else {
      return false;
    }
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

  exito(texto: any) {
    Swal.fire({
      title: 'Éxito',
      text: texto,
      icon: 'success',
      confirmButtonText: 'Aceptar',
      width: '350px',
    });
  }

  confirmacion(texto: any) {
    return Swal.fire({
      title: 'Confirmar',
      text: texto,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      width: '380px',
    });
  }
}
