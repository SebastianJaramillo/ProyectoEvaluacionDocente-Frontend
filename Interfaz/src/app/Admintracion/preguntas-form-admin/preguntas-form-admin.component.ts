import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { FormularioService } from 'src/app/services/formulario/formulario.service';
import { Pregunta } from '../formulario-admin/pregunta.model';

@Component({
  selector: 'app-preguntas-form-admin',
  templateUrl: './preguntas-form-admin.component.html',
  styleUrls: ['./preguntas-form-admin.component.css']
})
export class PreguntasFormAdminComponent {
  preguntasForm: FormGroup;
  cambios: boolean[] = []; // Array para rastrear cambios en las preguntas
  formulario: any = {};
  constructor(
    private fb: FormBuilder,
    private formularioService: FormularioService,
    public dialogRef: MatDialogRef<PreguntasFormAdminComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.preguntasForm = this.fb.group({
      id: [''],
      preguntas: this.fb.array([])
    });
  }

  ngOnInit(): void {
    if (this.data && this.data.preguntas && this.data.preguntas.id) {
      this.cargarPreguntas(this.data.preguntas.id);
    }
  }

  cargarPreguntas(id: number) {
    this.formularioService.getPreguntaFormulario(id).subscribe(
      (preguntas: Pregunta[]) => {
        const preguntasFormArray = this.preguntasForm.get('preguntas') as FormArray;

        preguntas.forEach(pregunta => {
          const preguntaFormGroup = this.fb.group({
            id: [{ value: pregunta.id, disabled: true }], // Deshabilita el campo id
            texto: [pregunta.texto]
          });
          preguntasFormArray.push(preguntaFormGroup);
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }


  onSubmit(): void {
    this.dialogRef.close(this.preguntasForm.getRawValue().preguntas);
  }

  get preguntas(): FormArray {
    return this.preguntasForm.get('preguntas') as FormArray;
  }
  agregarPregunta(): void {
    const preguntasFormArray = this.preguntasForm.get('preguntas') as FormArray;
    preguntasFormArray.push(this.fb.group({
      id: [''],
      texto: ['']
    }));
    this.cambios.push(false); // Inicializa sin cambios
  }


  guardarPregunta(index: number): void {
    const preguntaFormGroup = this.preguntas.at(index) as FormGroup;
    
    const pregunta: Pregunta = preguntaFormGroup.value;
    console.log("this data", preguntaFormGroup);
    const preguntaId = preguntaFormGroup.get('id')?.value;
    
   pregunta.id = preguntaId;
    pregunta.formId = this.data.preguntas.id;
    this.formularioService.findById(this.data.preguntas.id).subscribe(
      (data) => {
        this.formulario = data;
        pregunta.formulario = this.formulario;
      },
      (error) => {
        console.error('Error cargando el formulario:', error);
      }
    );
    
    if (!pregunta.id) {
      alert('Por favor, ingrese un ID válido para la pregunta.');
      return;
    } 
    
    console.log('Pregunta :', pregunta);
    this.formularioService.savePregunta(pregunta).subscribe({
      next: (pregunta) => {
        console.log('Pregunta guardada:', pregunta);
        // Opcional: Actualizar el ID de la pregunta en el formulario si es una nueva pregunta
        if (!pregunta.id) {
          preguntaFormGroup.patchValue({ id: pregunta.id });
        }
        this.agregarPregunta();
      },
      error: (error) => {
        console.error('Error guardando la pregunta:', error);
      }
    });
  }


  eliminarPregunta(index: number): void {
    const preguntaFormGroup = this.preguntas.at(index) as FormGroup;
    const pregunta: Pregunta = preguntaFormGroup.value;
    const preguntaId = preguntaFormGroup.get('id')?.value;
    
   pregunta.id = preguntaId;
   this.formularioService.deletePregunta(pregunta.id).subscribe({
    next: (pregunta) => {
      console.log('Pregunta eliminada:', pregunta);
      // Opcional: Actualizar el ID de la pregunta en el formulario si es una nueva pregunta
    },
    error: (error) => {
      console.error('Error eliminando la pregunta:', error);
    }
  });
   (this.preguntasForm.get('preguntas') as FormArray).removeAt(index);
   this.cambios.splice(index, 1); // Asegúrate de eliminar también el estado de cambio
  }

  cambioDetectado(index: number): void {
    this.cambios[index] = true; // Marca que hubo un cambio en la pregunta en el índice especificado
  }
}
