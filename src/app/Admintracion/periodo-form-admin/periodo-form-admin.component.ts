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

  onSubmit() {
    this.dialogRef.close(this.evaluacionForm.value);

    this.mensaje('Periodo guardado correctamente');
    if (this.evaluacionForm.valid) {
      this.dialogRef.close(this.evaluacionForm.value);
    }
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
}
