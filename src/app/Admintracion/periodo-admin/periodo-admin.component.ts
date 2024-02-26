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

@Component({
  selector: 'app-periodo-admin',
  templateUrl: './periodo-admin.component.html',
  styleUrls: ['./periodo-admin.component.css'],
})
export class PeriodoAdminComponent implements OnInit {
  periodos: Periodo[] = [];
  evaluaciones: Evaluacion[] = [];
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
    this.periodoForm = this.fb.group({
      id: [''],
      descripcion: [''],
      estado: [''],
    });
    this.getAllEvaluacionesConNombreDePeriodo();
  }

  getAllEvaluacionesConNombreDePeriodo() {
    forkJoin({
      evaluaciones: this.evaluacionService.getAllEvaluaciones(),
      periodos: this.evaluacionService.getAllPeriodos(),
    }).subscribe({
      next: ({ evaluaciones, periodos }) => {        
        this.evaluaciones = evaluaciones.map((evaluacion) => {
          const periodo = periodos.find((p) => {
            return p.id === evaluacion.perId;
          });
          return {
            ...evaluacion,
            nombrePeriodo: periodo
              ? periodo.descripcion
              : 'Periodo no encontrado',
          };
        });
      },
      error: (error) => console.error(error),
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

  guardarPeriodo() {
    if (this.modoEdicion) {
      this.actualizarPeriodo();
    } else {
      this.crearPeriodo();
    }
  }

  abrirFormulario() {
    const dialogRef = this.dialog.open(PeriodoFormAdminComponent, {
      width: '550px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        if (result.fechaFin && result.fechaInicio) {
          this.evaluacion.evalFechaFin = new Date(
            result.fechaFin
          ).toISOString();
          //this.evaluacion.fechaFin = result.fechaFin + "T00:00:00.000+00:00";
          this.evaluacion.evalFechaInicio = new Date(
            result.fechaInicio
          ).toISOString();
          this.evaluacion.estado = 'ACTIVO';
          this.evaluacion.perId = result.idPeriodo;
          this.evaluacionService.createEvaluacion(this.evaluacion).subscribe(
            (data) => {
              this.getAllEvaluacionesConNombreDePeriodo();
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
  crearPeriodo() {
    /* this.periodoService.crearPeriodo(this.periodoForm.value).subscribe(() => {
       this.cargarPeriodos();
       this.periodoForm.reset();
     });*/
  }

  editarPeriodo(id: number) {
    /*
    this.periodoForm.setValue(periodo);
    this.modoEdicion = true;
    */
  }

  actualizarPeriodo() {
    /*this.periodoService.actualizarPeriodo(this.periodoForm.value).subscribe(() => {
      this.cargarPeriodos();
      this.periodoForm.reset();
      this.modoEdicion = false;
    });*/
  }

  eliminarPeriodo(id: number) {
    this.evaluacionService.findEvaluacion(id).subscribe({
      next: (data) => {
        this.evaluacion = data;
        if (this.evaluacion.estado == 'ACTIVO') {
          this.mensaje('No es posible eliminar una evaluacion activa');
        } else {
          this.confirmacion('¿Desea eliminar el periodo?').then((result) => {
            if (result.isConfirmed) {
              this.evaluacionService.deleteEvalucion(id).subscribe({
                next: (data) => {
                  this.getAllEvaluacionesConNombreDePeriodo();
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
        this.getAllEvaluacionesConNombreDePeriodo();
      },
      error: (error) => {
        console.error('Error al actualizar el estado de la evaluación', error);
      },
    });
    /*this.periodoService.eliminarPeriodo(id).subscribe(() => {
      this.cargarPeriodos();
    });*/
  }

  cancelarEdicion() {
    /*this.periodoForm.reset();
    this.modoEdicion = false;
  */
  }

  cambiarEstado(id: number, estadoActual: string): void {
    if (estadoActual == 'ACTIVO') {
      estadoActual = 'INACTIVO';
    } else {
      estadoActual = 'ACTIVO';
    }

    this.evaluacionService.updateEstadoEvaluacion(id, estadoActual).subscribe({
      next: (data) => {
        this.getAllEvaluacionesConNombreDePeriodo();
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
