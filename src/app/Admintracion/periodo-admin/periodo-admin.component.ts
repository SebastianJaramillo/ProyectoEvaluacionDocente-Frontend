import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EvaluacionService } from 'src/app/services/evaluacion/evaluacion.service';
import { PeriodoFormAdminComponent } from '../periodo-form-admin/periodo-form-admin.component';
import { Evaluacion } from '../../periodo/evaluacion.model'
import { Periodo } from 'src/app/periodo/periodo.model';

@Component({
  selector: 'app-periodo-admin',
  templateUrl: './periodo-admin.component.html',
  styleUrls: ['./periodo-admin.component.css']
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
  ) { }
  ngOnInit(): void {

    this.periodoForm = this.fb.group({
      id: [''],
      descripcion: [''],
      estado: ['']
    });
    this.getAllEvaluacionesConNombreDePeriodo();

  }

  getAllEvaluacionesConNombreDePeriodo() {
    forkJoin({
      evaluaciones: this.evaluacionService.getAllEvaluaciones(),
      periodos: this.evaluacionService.getAllPeriodos()

    }).subscribe({
      next: ({ evaluaciones, periodos }) => {
        console.log("periodos", periodos);
        console.log("evaluaciones", evaluaciones);
        this.evaluaciones = evaluaciones.map(evaluacion => {
          const periodo = periodos.find(p => {

            //console.log(`Comparando:`, evaluacion);
            //console.log(`Comparando: ${p.id} con ${evaluacion.perId}`);
            return p.id === evaluacion.perId;
          });
          //console.log("Periodo encontrado:", periodo);
          return {
            ...evaluacion,
            nombrePeriodo: periodo ? periodo.descripcion : 'Periodo no encontrado',
          };
        });
      },
      error: (error) => console.error(error)
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
      width: '550px'
      ,
      // Puedes pasar datos al diálogo así:
      data: { /* tus datos aquí */ }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo fue cerrado', result);
      if (result !== undefined) {
        console.log("Datos del formulario:", result);
        if (result.fechaFin && result.fechaInicio) {
          this.evaluacion.evalFechaFin = new Date(result.fechaFin).toISOString();
          //this.evaluacion.fechaFin = result.fechaFin + "T00:00:00.000+00:00";
          this.evaluacion.evalFechaInicio = new Date(result.fechaInicio).toISOString();
          this.evaluacion.estado = "ACTIVO";
          this.evaluacion.perId = result.idPeriodo;
          this.evaluacionService.createEvaluacion(this.evaluacion).subscribe(
            (data) => {
              console.log("Registro guardado", this.evaluacion);
              this.getAllEvaluacionesConNombreDePeriodo();
            },
            (error) => {
              console.error(error);
            }
          );

          console.log("Datos del formulario actualizado:", this.evaluacion);


        }
      } else {
        // Manejo de cierre sin acción (por ejemplo, cancelar)
        console.log("El diálogo se cerró sin enviar datos");
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
    this.evaluacionService.findEvaluacion(id).subscribe(
      {
        next: (data) => {
          this.evaluacion = data
          if(this.evaluacion.estado == 'ACTIVO'){
              alert('no es posible eliminar una evaluacion activa')
          }else {
            this.evaluacionService.deleteEvalucion(id).subscribe({
              next: (data) => {
                console.log("Registro eliminado correctamente");
                this.getAllEvaluacionesConNombreDePeriodo();
              },
              error: (error) => {
                console.error("Error al eliminar el estado de la evaluación", error);
              }
            });
          }
          console.log("Estado de la evaluación actualizado", data);
          this.getAllEvaluacionesConNombreDePeriodo();
        },
        error: (error) => {
          console.error("Error al actualizar el estado de la evaluación", error);
        }
      }

    );
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
    console.log(`estado`, estadoActual);
    if (estadoActual == 'ACTIVO') {
      estadoActual = 'INACTIVO';
    } else {
      estadoActual = 'ACTIVO';
    }

    console.log(`Cambiando estado del formulario con ID ${id} a ${estadoActual}`);

    this.evaluacionService.updateEstadoEvaluacion(id, estadoActual).subscribe({
      next: (data) => {
        console.log("Estado de la evaluación actualizado", data);
        this.getAllEvaluacionesConNombreDePeriodo();
      },
      error: (error) => {
        console.error("Error al actualizar el estado de la evaluación", error);
      }
    });
  }
  getEstadoAsBoolean(estado: string): boolean {
    if (estado == 'ACTIVO') {
      return true;
    } else {
      return false;
    }

  }
}