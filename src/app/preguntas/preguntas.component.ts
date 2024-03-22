import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService } from '../services/curso/cursos.service';
import { AlumnoService } from '../services/alumno/alumno.service';
import { FormularioService } from '../services/formulario/formulario.service';
import { DocenteService } from '../services/docente/docente.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EvaluacionService } from '../services/evaluacion/evaluacion.service';
import Swal from 'sweetalert2';

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
  timer: number = 5;

  opciones = [
    { valor: 1, texto: ' (1) Nunca' },
    { valor: 2, texto: ' (2) Casi nunca' },
    { valor: 3, texto: ' (3) Ocasionalmente' },
    { valor: 4, texto: ' (4) Casi siempre' },
    { valor: 5, texto: ' (5) Siempre' },
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
    const role = localStorage.getItem('role');
    if (role && role === 'ESTUDIANTE') {
    } else {
      this.mensajeError('Acceso denegado. Vuelva a iniciar sesión.');
      localStorage.clear();
      this.router.navigate(['']);
    }

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
    this.iniciarTimer();
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

  iniciarTimer() {
    this.timer = 5;
    const temporizador = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        clearInterval(temporizador);
      }
    }, 1000);
  }

  isSelectAnswer(): boolean {
    const pregunta = this.preguntas[this.preguntaActual];
    return pregunta.respuestaSeleccionada !== undefined && this.timer === 0;
  }

  siguiente() {
    const pregunta = this.preguntas[this.preguntaActual];

    if (this.preguntaActual < this.preguntas.length) {
      this.preguntaActual++;
      this.respuestas.push({
        preId: pregunta.id,
        texto: pregunta.respuestaSeleccionada,
        docEvaluado: this.docId,
        evalId: this.evalId
      });
    }
    
    this.iniciarTimer();
  }

  guardar() {
    const pregunta = this.preguntas[this.preguntaActual];

    this.respuestas.push({
      preId: pregunta.id,
      texto: pregunta.respuestaSeleccionada,
      docEvaluado: this.docId,
      evalId: this.evalId
    });    

    this.formularioService.saveRespuestas(this.respuestas).subscribe(
      (data) => {
        this.alumnoService.updateEstadoEval(this.cursoEstudianteId).subscribe(          
          (data) => {            
            this.mensaje("Respuestas guardadas correctamente");
            this.router.navigate(['cursos', this.id, this.evalId]);
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
  
  volver() {
    this.router.navigate(['cursos', this.id, this.evalId]);
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
