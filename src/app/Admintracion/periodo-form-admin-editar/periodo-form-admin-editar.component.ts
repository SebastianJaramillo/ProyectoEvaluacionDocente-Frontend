import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EvaluacionService } from 'src/app/services/evaluacion/evaluacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-periodo-form-admin-editar',
  templateUrl: './periodo-form-admin-editar.component.html',
  styleUrls: ['./periodo-form-admin-editar.component.css'],
})
export class PeriodoFormAdminEditarComponent {
  evaluacionForm: FormGroup;
  periodos: any[] = [];
  evaluacion: any = {};

  constructor(
    public dialogRef: MatDialogRef<PeriodoFormAdminEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private evaluacionService: EvaluacionService,
    private fb: FormBuilder
  ) {
    this.evaluacionForm = this.fb.group({
      id: [''],
      fechaInicio: [''],
      fechaFin: [''],
      idPeriodo: [''],
    });
  }

  ngOnInit(): void {
    this.initForm();
    this.setFormData(this.data);

    this.cargarPeriodos();
  }

  initForm(): void {
    this.evaluacionForm = this.fb.group({
      id: [''],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      idPeriodo: ['', Validators.required],
    });
  }

  setFormData(evaluacion: any): void {
    this.evaluacionForm.patchValue({
      id: evaluacion.id,
      fechaInicio: evaluacion.evalFechaInicio,
      fechaFin: evaluacion.evalFechaFin,
      idPeriodo: evaluacion.periodo.id,
    });
  }

  cargarPeriodos() {
    this.evaluacionService.getAllPeriodos().subscribe({
      next: (data) => (this.periodos = data),
      error: (err) => console.error(err),
    });
  }

  findByPeriodo(id: number) {
    this.evaluacionService.findEvaluacionByPeriodo(id).subscribe(
      (data) => {
        this.evaluacionService.getAllEvaluaciones().subscribe(
          (data) => {        
            const periodoExiste = data.find(evaluacion => evaluacion.perId === id);
            if(periodoExiste) {
              this.mensaje('Evaluación actualizada correctamente');
              if (this.evaluacionForm.valid) {
                this.dialogRef.close(this.evaluacionForm.value);
              }
            } else {
              this.mensajeError('Periodo ya se encuentra asignado a otra evaluacion');
            }
          },
          (error) => {
            console.log(error)
          }
        );
      },
      (error) => {
        console.log(error)
      }
    );
  }

  onSubmit() {
    const evaluacion = this.evaluacionForm.value;

    if (
      !evaluacion.fechaInicio ||
      !evaluacion.fechaFin ||
      !evaluacion.idPeriodo
    ) {
      this.mensajeError('Llenar todos los campos');
      return;
    }

    const fechaInicio = new Date(evaluacion.fechaInicio);
    const fechaFin = new Date(evaluacion.fechaFin);
    if (fechaInicio >= fechaFin) {
      this.mensajeError(
        'La fecha de inicio debe ser menor que la fecha de fin'
      );
      return;
    }

    this.findByPeriodo(evaluacion.idPeriodo);
  }

  onCancel() {
    this.dialogRef.close();
  }

  inicializarFormulario(datos?: any): void {
    this.evaluacionForm.patchValue({
      fechaInicio: datos ? datos.fechaInicio : '',
      fechaFin: datos ? datos.fechaFin : '',
      idPeriodo: datos ? datos.idPeriodo : '',
    });
  }

  mensaje(texto: any) {
    Swal.fire({
      title: 'Éxito',
      text: texto,
      icon: 'success',
      confirmButtonText: 'Aceptar',
      width: '350px',
    });
  }

  mensajeError(texto: any) {
    Swal.fire({
      title: 'Error',
      text: texto,
      icon: 'error',
      confirmButtonText: 'Aceptar',
      width: '350px',
    });
  }
}
