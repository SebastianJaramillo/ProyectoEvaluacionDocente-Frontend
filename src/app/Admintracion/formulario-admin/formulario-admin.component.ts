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
  filtroSeleccionado: string = '';
  opcionesDeFiltro: string[] = ['HETEROEVALUACION', 'AUTOEVALUACION', 'COEVALUACION POR PARES', 'COEVALUACION DIRECTIVA'];

  evaluacionForm!: FormGroup;
  preguntasForm!: FormGroup;
  modoEdicion: boolean = false;

  constructor(
    private formularioService: FormularioService,    
    private fb: FormBuilder,
    public dialog: MatDialog
  ) { }

  filtrarFormularios(): void {
    switch (this.filtroSeleccionado) {
      case 'HETEROEVALUACION':

        this.getFormularioByNombre("Heteroevaluacion");
        break;
      case 'AUTOEVALUACION':
        this.getFormularioByNombre("Autoevaluacion");
        break;
      case 'COEVALUACION POR PARES':
        this.getFormularioByNombre("Coevaluacion");
        break;
      case 'COEVALUACION DIRECTIVA':
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
    this.getAllFormularios();
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
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo fue cerrado', result);
      if (result !== undefined) {
        console.log("Datos del formulario:", result);
        if (result.nombre && result.descripcion) {
          this.formulario.nombre = result.nombre;
          this.formulario.descripcion = result.descripcion;
          console.log("Datos del formulario actualizado:", this.formulario);

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

        const dialogRef = this.dialog.open(FormularioFormAdminComponent, {
          width: '550px',
          data: { formulario: this.evaluacionForm.value }
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result !== undefined) {
            console.log("Datos del formulario recibidos del diálogo:", result);
            if (result.nombre && result.descripcion) {
              this.actualizarFormulario(result);
            }
          } else {
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
        this.getAllFormularios();
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
      this.getAllFormularios();
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
          width: '800px',
          data: { preguntas: this.preguntasForm.value },
          panelClass: 'mi-clase-personalizada'
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('El diálogo de preguntas se cerró');
          if (result) {
            console.log("Preguntas actualizadas:", result);
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

    // this.formularioService.actualizarEstado(formulario.id, formulario.estado).subscribe(...);
  }
}
