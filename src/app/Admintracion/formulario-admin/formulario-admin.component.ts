import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormularioService } from 'src/app/services/formulario/formulario.service';
import { FormularioFormAdminComponent } from '../formulario-form-admin/formulario-form-admin.component';
import { Formulario } from './formulario.model';
import { PreguntasFormAdminComponent } from '../preguntas-form-admin/preguntas-form-admin.component';
@Component({
  selector: 'app-formulario-admin',
  templateUrl: './formulario-admin.component.html',
  styleUrls: ['./formulario-admin.component.css']
})
export class FormularioAdminComponent implements OnInit {
  formularios: Formulario[] = [];
  formulario: any = {};
  id: any;
  eval: any = {};
  evalId: any;
  preguntas: any[] = [];
  public filtroSeleccionado: string = '';
  opcionesDeFiltro: string[] = ['HETEROEVALUACION', 'AUTOEVALUACION', 'COEVALUACION', 'COEVALUACION DIRECTOR'];

  evaluacionForm!: FormGroup;
  preguntasForm!: FormGroup;
  modoEdicion: boolean = false;

  constructor(
    private formularioService: FormularioService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) { }

  filtrarFormularios(): void {
    console.log(this.filtroSeleccionado);
    switch (this.filtroSeleccionado) {
      case 'HETEROEVALUACION':

        this.getFormularioByNombre("Heteroevaluacion");
        break;
      case 'AUTOEVALUACION':
        // Ejemplo para otro filtro específico
        this.getFormularioByNombre("Autoevaluacion");
        break;
      case 'COEVALUACION':
        // Ejemplo para otro filtro específico
        this.getFormularioByNombre("Coevaluacion");
        break;
      case 'COEVALUACION DIRECTOR':
        // Ejemplo para otro filtro específico
        this.getFormularioByNombre("Coevaluacion director");
        break;
      default:
        this.getAllFormularios();

        break;
    }
  }
  ngOnInit(): void {

    this.evaluacionForm = this.fb.group({
      id: [''],
      nombre: [''],
      descripcion: ['']
    });
    this.preguntasForm = this.fb.group({
      id: ['']
    });


  }
  getAllFormularios() {
    this.formularioService.getFormularioListar().subscribe(
      (data) => {
        this.formularios = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getFormularioByNombre(nombre: string) {
    this.formularioService.findByNombre(nombre).subscribe(
      (data) => {
        this.formularios = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }


  abrirModalFormulario() {
    const dialogRef = this.dialog.open(FormularioFormAdminComponent, {
      width: '550px'
      ,
      // Puedes pasar datos al diálogo así:
      data: { /* tus datos aquí */ }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo fue cerrado', result);
      if (result !== undefined) {
        console.log("Datos del formulario:", result);
        if (result.nombre && result.descripcion) {
          this.formulario.nombre = result.nombre;
          this.formulario.descripcion = result.descripcion;
          console.log("Datos del formulario actualizado:", this.formulario);

          // Guarda o procesa los datos aquí
          this.formularioService.saveFormulario(this.formulario).subscribe(
            (data) => {
              console.log("Registro guardado", this.formulario);
              this.getAllFormularios();
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

  editarModalFormulario(id: number) {
    this.formularioService.findById(id).subscribe(
      (data) => {
        this.formulario = data;

        this.evaluacionForm.patchValue({
          id: id,
          nombre: this.formulario.nombre,
          descripcion: this.formulario.descripcion
        });

        // Abre el diálogo y pasa el FormGroup como parte de los datos
        const dialogRef = this.dialog.open(FormularioFormAdminComponent, {
          width: '550px',
          data: { formulario: this.evaluacionForm.value } // Asegúrate de pasar el valor más actualizado
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result !== undefined) {
            console.log("Datos del formulario recibidos del diálogo:", result);
            // Asegúrate de que los datos recibidos sean válidos antes de actualizar
            if (result.nombre && result.descripcion) {
              this.actualizarFormulario(result);
            }
          } else {
            // Manejo de cierre sin acción (por ejemplo, cancelar)
            console.log("El diálogo se cerró sin enviar datos");
          }
        });
      },
      (error) => {
        console.error('Error cargando el formulario:', error);
      }
    );
  }

  actualizarFormulario(datosFormulario: any) {
    this.formulario.nombre = datosFormulario.nombre;
    this.formulario.descripcion = datosFormulario.descripcion;

    this.formularioService.saveFormulario(this.formulario).subscribe(
      (data) => {
        console.log("Formulario actualizado:", data);
        this.getAllFormularios(); // Recarga tus formularios o realiza otra acción después de guardar
      },
      (error) => {
        console.error('Error guardando el formulario:', error);
      }
    );
  }

  cargarFormularios(): void {
    /*
    this.formularioService.obtenerFormularios().subscribe(data => {
      this.formularios = data;
    });*/
  }

  eliminarFormulario(id: number): void {
    this.formularioService.deleteFormulario(id).subscribe(() => {
      this.getAllFormularios();// Recargar la lista después de eliminar
    });
  }


  cargarPreguntas(id: number): void {
    this.formularioService.getPreguntaFormulario(id).subscribe(
      (data) => {
        this.preguntas = data;
        //this.preguntas.push(this.fb.control(this.preguntas))

        console.log("Preguntas obtenidas:", this.preguntas);
        this.preguntasForm.patchValue({
          id: id
        });
        const dialogRef = this.dialog.open(PreguntasFormAdminComponent, {
          width: '550px',
          data: { preguntas: this.preguntasForm.value } // Asume que 'formulario.preguntas' es tu array de preguntas existentes
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('El diálogo de preguntas se cerró');
          if (result) {
            console.log("Preguntas actualizadas:", result);
            // Aquí puedes actualizar las preguntas en tu modelo 'formulario' y posiblemente guardar los cambios
          }
        });

      },
      (error) => {
        console.error(error);
      }
    );
  }

  cambiarEstado(formulario: any): void {
    console.log('Nuevo estado del formulario:', formulario.estado);

    // Aquí podrías llamar a tu servicio para actualizar el estado en el backend
    // this.formularioService.actualizarEstado(formulario.id, formulario.estado).subscribe(...);
  }
}
