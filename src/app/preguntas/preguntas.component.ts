import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService } from '../services/curso/cursos.service';
import { AlumnoService } from '../services/alumno/alumno.service';
import { FormularioService } from '../services/formulario/formulario.service';
import { DocenteService } from '../services/docente/docente.service';
import { AlertSuccessComponent } from '../alerts/alert-success/alert-success.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EvaluacionService } from '../services/evaluacion/evaluacion.service';

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
  id: any;
  alumno: any = {};
  cursoId: any;
  curso: any = {};
  formularioId: any;
  formulario: any = {};
  periodo: any = {};
  evaluacion: any = {};
  cursoEstudianteId: any;
  docId: any;
  evalId: number | undefined;
  asignatura: any;
  docente: any = {};
  botonDesactivado = true;

  opciones = [
    { valor: 1, texto: 'Totalmente en desacuerdo' },
    { valor: 2, texto: 'Medianamente en desacuerdo' },
    { valor: 3, texto: 'Ni de acuerdo ni en desacuerdo' },
    { valor: 4, texto: 'Medianamente de acuerdo' },
    { valor: 5, texto: 'Totalmente de acuerdo' },
  ];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private renderer: Renderer2,
    private cursoService: CursosService,
    private alumnoService: AlumnoService,
    private formularioService: FormularioService,
    private docenteService: DocenteService,
    private evaluacionService: EvaluacionService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.cursoId = params['cursoId'];
      this.formularioId = params['formId'];
      this.cursoEstudianteId = params['idCurEst'];
      this.evalId = params['evalId'];
      this.findFormulario(this.formularioId);
      this.findEstudiante(atob(this.id));
      this.findCurso(Number(atob(this.cursoId)));
      this.findEvaluacion(Number(this.evalId))
      this.cargarPreguntas(this.formularioId);
    });
    setTimeout(() => {
      this.renderer.setProperty(document.getElementById('btnsiguiente'), 'disabled', false);
      this.botonDesactivado = false;
    }, 5000);
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
        this.formulario.nombre = this.formulario.nombre.toUpperCase();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  findEstudiante(id: string) {
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
        this.asignatura = this.curso.asignatura.nombre;
        this.docId = data.docId;
        this.findDocente(this.docId);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  findDocente(id: string) {
    this.docenteService.findById(id).subscribe(
      (data) => {
        this.docente = data        
      },
      (error) => {
        console.error(error);
      }
    );
  }

  findEvaluacion(id: number): any {
    this.evaluacionService.findEvaluacion(id).subscribe(
      (data) => {
        this.evaluacion = data;
        this.findPeriodo(this.evaluacion.perId);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  findPeriodo(id: number): any {
    this.evaluacionService.getPeriodoById(id).subscribe(
      (data) => {
        this.periodo = data;
        console.log(data)
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
        preId: pregunta.id,
        texto: pregunta.respuestaSeleccionada,
        docEvaluado: this.docId,
      });
    }
  }

  guardar() {
    const pregunta = this.preguntas[this.preguntaActual];

    this.respuestas.push({
      preId: pregunta.id,
      texto: pregunta.respuestaSeleccionada,
      docEvaluado: this.docId,
    });    

    this.formularioService.saveRespuestas(this.respuestas).subscribe(
      (data) => {
        this.alumnoService.updateEstadoEval(this.cursoEstudianteId).subscribe(          
          (data) => {            
            this.successModal("Respuestas guardadas correctamente");
            this.router.navigate(['cursos', this.id]);
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

  successModal(message: string) {
    const modalRef = this.modalService.open(AlertSuccessComponent);
    modalRef.componentInstance.message = message;
  }

  volver() {
    this.router.navigate(['cursos', this.id, this.evalId]);
  }
}