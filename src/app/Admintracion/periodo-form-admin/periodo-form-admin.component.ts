import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EvaluacionService } from 'src/app/services/evaluacion/evaluacion.service'; // Ajusta según sea necesario
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-periodo-form-admin',
  templateUrl: './periodo-form-admin.component.html',
  styleUrls: ['./periodo-form-admin.component.css'],
})
export class PeriodoFormAdminComponent {
  evaluacionForm: FormGroup;
  periodos: any[] = [];
  evaluacion: any = {};

  constructor(
    public dialogRef: MatDialogRef<PeriodoFormAdminComponent>,
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
    if (this.data && this.data.formulario) {
      this.inicializarFormulario(this.data.formulario);
    } else {
      this.inicializarFormulario();
    }

    this.cargarPeriodos();
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
        this.mensajeError(
          'Ya existe una evaluación en ese periodo. Si desea habilitar nuevamente, edite las fechas'
        );
      },
      (error) => {
        this.dialogRef.close(this.evaluacionForm.value);

        this.mensaje('Periodo guardado correctamente');
        if (this.evaluacionForm.valid) {
          this.dialogRef.close(this.evaluacionForm.value);
        }
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
      this.mensajeError(
        'Llenar todos los campos'
      );
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
