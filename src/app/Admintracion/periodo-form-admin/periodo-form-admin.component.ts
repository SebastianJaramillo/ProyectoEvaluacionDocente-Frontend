import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EvaluacionService } from 'src/app/services/evaluacion/evaluacion.service'; // Ajusta según sea necesario
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-periodo-form-admin',
  templateUrl: './periodo-form-admin.component.html',
  styleUrls: ['./periodo-form-admin.component.css']
})
export class PeriodoFormAdminComponent {
  evaluacionForm: FormGroup;
  periodos: any[] = []; // Ajusta el tipo según tu modelo de Periodo

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
      idPeriodo: ['']
    });
  }

  ngOnInit(): void {

    if (this.data && this.data.formulario) {
      this.inicializarFormulario(this.data.formulario);
    } else {
      // Si no hay datos, simplemente inicializa el formulario para un nuevo elemento
      this.inicializarFormulario();
    }


    this.cargarPeriodos();
  }

  cargarPeriodos() {
    // Asume que el servicio tiene un método getAllPeriodos() que devuelve un Observable
    this.evaluacionService.getAllPeriodos().subscribe({
      next: (data) => this.periodos = data,
      error: (err) => console.error(err)
    });
  }

  
  onSubmit() {
    console.log("ente")
    this.dialogRef.close(this.evaluacionForm.value);
    if (this.evaluacionForm.valid) {
      this.dialogRef.close(this.evaluacionForm.value);
    }
  }
  onCancel() {
    this.dialogRef.close(); // Cierra sin enviar datos, result será undefined
  }
  inicializarFormulario(datos?: any): void {
    console.log("datos",datos)
    this.evaluacionForm.patchValue({
      fechaInicio: datos ? datos.fechaInicio : '',
      fechaFin: datos ? datos.fechaFin : '',
      idPeriodo: datos ? datos.idPeriodo : '',
      // Asegúrate de manejar todos los campos de tu formulario aquí
    });
}
}
