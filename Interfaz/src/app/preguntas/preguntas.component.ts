import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService } from '../services/curso/cursos.service';
import { AlumnoService } from '../services/alumno/alumno.service';
import { FormularioService } from '../services/formulario/formulario.service';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css'],
})
export class PreguntasComponent implements OnInit {
  preguntas: any[] = [];
  preguntaActual: number = 0;
  respuestaSeleccionada: any;
  respuestas: any[] = [];
  alumnoId: any;
  alumno: any = {};
  cursoId: any;
  curso: any = {};
  formularioId: any;
  formulario: any = {};
  cursoEstudianteId: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cursoService: CursosService,
    private alumnoService: AlumnoService,
    private formularioService: FormularioService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.alumnoId = params['alumnoId'];
      this.cursoId = params['cursoId'];
      this.formularioId = params['formId'];
      this.formularioId = params['formId'];
      this.cursoEstudianteId = params['id'];
      this.findFormulario(this.formularioId);
      this.findEstudiante(this.alumnoId);
      this.findCurso(this.cursoId);
      this.cargarPreguntas(this.formularioId);
    });
  }

  cargarPreguntas(id: number) {
    this.formularioService.getPreguntaFormulario(id).subscribe(
      (data) => {
        this.preguntas = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  findFormulario(id: number) {
    this.formularioService.findById(id).subscribe(
      (data) => {
        this.formulario = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  findEstudiante(id: number) {
    this.alumnoService.getAlumnoById(id).subscribe(
      (data) => {
        this.alumno = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  findCurso(id: number) {
    this.cursoService.findById(id).subscribe(
      (data) => {
        this.curso = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  seleccionarRespuesta(opcion: number) {
    const pregunta = this.preguntas[this.preguntaActual];

    if (pregunta.respuestaSeleccionada === opcion) {
      pregunta.respuestaSeleccionada = undefined;
    } else {
      pregunta.respuestaSeleccionada = opcion;
    }
  }

  isSelectAnswer(): boolean {
    const pregunta = this.preguntas[this.preguntaActual];
    return pregunta.respuestaSeleccionada !== undefined;
  }

  siguiente() {
    const pregunta = this.preguntas[this.preguntaActual];

    if (this.preguntaActual < this.preguntas.length) {
      this.preguntaActual++;
      this.respuestas.push({
        preId: this.preguntaActual,
        texto: pregunta.respuestaSeleccionada,
      });
    }
  }

  guardar() {
    const pregunta = this.preguntas[this.preguntaActual];
    
    this.respuestas.push({
      preId: this.preguntaActual,
      texto: pregunta.respuestaSeleccionada,
    });
    this.formularioService.saveRespuestas(this.respuestas).subscribe(
      (data) => {
        this.alumnoService.updateEstadoEval(this.cursoEstudianteId).subscribe(
          (data) => {
            alert('Respuestas guardadas');
            this.router.navigate(['cursos', this.alumnoId]);
          },
          (error) => {
            console.error(error);
          }
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
