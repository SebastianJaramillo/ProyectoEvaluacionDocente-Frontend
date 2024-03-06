import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormularioService } from '../services/formulario/formulario.service';
import { DocenteService } from '../services/docente/docente.service';
import { DocenteEvaluacion } from './DocenteEvaluacion';
import { EvaluacionService } from '../services/evaluacion/evaluacion.service';
import { FuncionService } from '../services/funcion/funcion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-preguntas-docente',
  templateUrl: './preguntas-docente.component.html',
  styleUrls: ['./preguntas-docente.component.css'],
})
export class PreguntasDocenteComponent implements OnInit {
  preguntas: any[] = [];
  preguntaActual: number = 0;
  respuestaSeleccionada: any;
  respuestas: any[] = [];
  id: any;
  idJefe: any;
  formularioId: any;
  formulario: any = {};
  docId: any;
  funcId: any;
  funcion: any = {};
  docente: any = {};
  evaluador: any = {};
  eval: any = {};
  evalId: any;
  periodo: any = {};
  evaluacion: DocenteEvaluacion = {} as DocenteEvaluacion;
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
    private formularioService: FormularioService,
    private docenteService: DocenteService,
    private evaluacionService: EvaluacionService,
    private funcionService: FuncionService
  ) {}

  ngOnInit(): void {
    const role = localStorage.getItem('role');
    if (role && role === 'DOCENTE') {
    } else {
      this.mensajeError('Acceso denegado. Vuelva a iniciar sesión.');
      localStorage.clear();
      this.router.navigate(['']);
    }

    this.route.params.subscribe((params) => {
      this.idJefe = params['idJefe'];
      this.id = params['idDoc'];
      this.formularioId = params['formId'];
      this.funcId = params['funcId'];
      this.evalId = params['evalId'];
      this.findFormulario(this.formularioId);
      this.findDocente(atob(this.id));
      this.findEvaluador(atob(this.idJefe));
      this.findPeriodo(this.evalId);

      if(this.formulario.nombre != 'COEVALUACION DIRECTIVA') {
        this.findFuncion(atob(this.funcId));
      }

      this.findEvaluacion(Number(this.evalId));
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

        switch (this.formulario.nombre) {
          case 'Coevaluacion':
            this.formulario.nombre = 'COEVALUACION POR PARES';
            break;
          case 'Coevaluacion director':
            this.formulario.nombre = 'COEVALUACION DIRECTIVA';
            break;
          case 'Autoevaluacion':
            this.formulario.nombre = 'AUTOEVALUACION';
            break;
          default:
            console.log('No se encontró formulario');
        }

        this.formulario.descripcion = this.formulario.descripcion.toUpperCase();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  findDocente(id: string) {
    this.docenteService.findById(id).subscribe(
      (data) => {
        this.docente = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  findEvaluador(id: string) {
    this.docenteService.findById(id).subscribe(
      (data) => {
        this.evaluador = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  findFuncion(id: string) {
    this.funcionService.findById(id).subscribe(
      (data) => {
        this.funcion = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  findEvaluacion(id: number): any {
    this.evaluacionService.findEvaluacion(id).subscribe(
      (data) => {
        this.eval = data;
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
        docEvaluado: atob(this.id),
        evalId: this.evalId,
      });
    }

    this.iniciarTimer();
  }

  guardar() {
    const pregunta = this.preguntas[this.preguntaActual];

    this.respuestas.push({
      preId: pregunta.id,
      texto: pregunta.respuestaSeleccionada,
      docEvaluado: atob(this.id),
      evalId: this.evalId,
    });

    this.formularioService.saveRespuestas(this.respuestas).subscribe(
      (data) => {
        this.evaluacion.docEvaluador = atob(this.idJefe);
        this.evaluacion.docEvaluado = atob(this.id);
        this.evaluacion.evalId = this.evalId;
        this.evaluacion.actividad = this.formulario.descripcion;

        this.docenteService.saveEvaluacion(this.evaluacion).subscribe(
          (data) => {
            this.mensaje('Respuestas guardadas');
            if (this.funcion.rol == 'Coordinador') {
              this.router.navigate(['evaluacion-pares', this.idJefe, this.evalId, this.funcId]);
            } else {
              if (this.formulario.nombre == 'COEVALUACION DIRECTIVA') {
                this.router.navigate([
                  'evaluacion-directiva',
                  this.idJefe,
                  this.funcId.substring(0, 4),
                  this.evalId,
                ]);
              } else {
                this.router.navigate(['docentes', this.idJefe, this.evalId]);
              }
            }
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
    if (this.funcion.rol == 'Coordinador') {
      this.router.navigate(['evaluacion-pares', this.idJefe, this.evalId, this.funcId]);
    } else {
      if (this.formulario.nombre == 'COEVALUACION DIRECTIVA') {
        this.router.navigate([
          'evaluacion-directiva',
          this.idJefe,
          this.funcId.substring(0, 4),
          this.evalId,
        ]);
      } else {
        this.router.navigate(['docentes', this.idJefe, this.evalId]);
      }
    }
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
