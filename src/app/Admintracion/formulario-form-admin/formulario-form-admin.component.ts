import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-formulario-form-admin',
  templateUrl: './formulario-form-admin.component.html',
  styleUrls: ['./formulario-form-admin.component.css'],
})
export class FormularioFormAdminComponent implements OnInit {
  formularioEmergente: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<FormularioFormAdminComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.formularioEmergente = this.fb.group({
      nombre: [''],
      descripcion: [''],
    });
  }

  ngOnInit() {
    if (this.data && this.data.formulario) {
      this.inicializarFormulario(this.data.formulario);
    } else {
      this.inicializarFormulario();
    }
  }

  onSubmit() {
    if (this.formularioEmergente.valid) {
      this.mensaje('formulario guardada correctamente');
      this.dialogRef.close(this.formularioEmergente.value);
    }
  }
  onCancel() {
    this.dialogRef.close();
  }
  inicializarFormulario(datos?: any): void {
    console.log('prueba formulario', datos);
    this.formularioEmergente.patchValue({
      nombre: datos ? datos.nombre : '',
      descripcion: datos ? datos.descripcion : '',
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
