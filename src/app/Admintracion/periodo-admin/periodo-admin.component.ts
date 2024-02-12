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
            
            console.log(`Comparando:`,evaluacion);
            console.log(`Comparando: ${p.id} con ${evaluacion.per_id}`);
            return p.id === evaluacion.per_id;
          });
          console.log("Periodo encontrado:", periodo);
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
          this.evaluacion.nombre = result.nombre;
          this.evaluacion.descripcion = result.descripcion;
          console.log("Datos del formulario actualizado:", this.evaluacion);

          // Guarda o procesa los datos aquí
          this.evaluacionService.createEvaluacion(this.evaluacion).subscribe(
            (data) => {
              console.log("Registro guardado", this.evaluacion);
              this.getAllEvaluaciones();
            },
            (error) => {
              console.error(error);
            }
          );
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
    /*this.periodoService.eliminarPeriodo(id).subscribe(() => {
      this.cargarPeriodos();
    });*/
  }

  cancelarEdicion() {
    /*this.periodoForm.reset();
    this.modoEdicion = false;
  */
  }
}