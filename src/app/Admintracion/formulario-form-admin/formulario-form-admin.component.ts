import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-formulario-form-admin',
  templateUrl: './formulario-form-admin.component.html',
  styleUrls: ['./formulario-form-admin.component.css']
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
      descripcion: ['']
    });
  }

  ngOnInit() {
    // Verifica si hay datos pasados al diálogo y si es así, inicializa el formulario con esos datos
  // Verifica si el diálogo fue abierto para editar un elemento existente
  if (this.data && this.data.formulario) {
    this.inicializarFormulario(this.data.formulario);
  } else {
    // Si no hay datos, simplemente inicializa el formulario para un nuevo elemento
    this.inicializarFormulario();
  }
  }

  onSubmit() {
    if (this.formularioEmergente.valid) {
      this.dialogRef.close(this.formularioEmergente.value);
    }
  }
  onCancel() {
    this.dialogRef.close(); // Cierra sin enviar datos, result será undefined
  }
  inicializarFormulario(datos?: any): void {
    console.log("prueba formulario", datos)
    this.formularioEmergente.patchValue({
      nombre: datos ? datos.nombre : '',
      descripcion: datos ? datos.descripcion : '',
      // Asegúrate de manejar todos los campos de tu formulario aquí
    });
}
}

