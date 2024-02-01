import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormularioService } from '../services/formulario/formulario.service';
import { DocenteService } from '../services/docente/docente.service';
import { DocenteEvaluacion } from './DocenteEvaluacion';
import { EvaluacionService } from '../services/evaluacion/evaluacion.service';

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
  funcion: any;
  docente: any = {};
  eval: any = {};
  evalId: any;
  evaluacion: DocenteEvaluacion = {} as DocenteEvaluacion;

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
    private formularioService: FormularioService,
    private docenteService: DocenteService,
    private evaluacionService: EvaluacionService
  ) {}

  ngOnInit(): void {
    this.findByFechas();

    this.route.params.subscribe((params) => {
      this.idJefe = params['idJefe'];
      this.id = params['idDoc'];      
      this.formularioId = params['formId'];
      this.funcId = params['funcId'];
      this.evalId = params['evalId'];
      this.findFormulario(this.formularioId);
      this.findDocente(atob(this.id));
      this.cargarPreguntas(this.formularioId);

      switch (atob(this.funcId)) {
        case "DOC":
          this.funcion = "DOCENCIA";
          break;
        case "INV":
          this.funcion = "INVESTIGACIÓN";
          break;
        case "GES":
          this.funcion = "GESTIÓN";
          break;
        case "COR":
          this.funcion = "";
          break;
        default:
          console.log("No se encontró función");
      }
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
        this.formulario.nombre = this.formulario.nombre.toUpperCase();
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
        docEvaluado: atob(this.id)
      });
    }
  }

  findByFechas() {
    this.evaluacionService.findByFechas().subscribe(  
      (data) => {
        this.eval = data;
        this.evalId = this.eval.id;
      },
      (error) => {
        alert("Evaluación no se encuentra habilitada en estas fechas.")
        this.router.navigate(['periodo', this.idJefe]);
      }
    );
  }

  guardar() {
    const pregunta = this.preguntas[this.preguntaActual];

    this.respuestas.push({
      preId: pregunta.id,
      texto: pregunta.respuestaSeleccionada,
      docEvaluado: atob(this.id)
    });

    this.formularioService.saveRespuestas(this.respuestas).subscribe(
      (data) => {
        this.evaluacion.docEvaluador = atob(this.idJefe);
        this.evaluacion.docEvaluado = atob(this.id);
        this.evaluacion.evalId = this.evalId;
        
        this.docenteService.saveEvaluacion(this.evaluacion).subscribe(
          (data) => {
            alert('Respuestas guardadas');
            if(this.funcId == "") {
              this.router.navigate(['evaluacion-pares', this.idJefe, this.evalId]);
            } else {
              if(this.formulario.descripcion == 'Coevaluación directiva') {
                this.router.navigate(['evaluacion-directiva', this.idJefe, this.funcId, this.evalId]);
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
    if(this.funcId == "") {
      this.router.navigate(['evaluacion-pares', this.idJefe, this.evalId]);
    } else {
      if(this.formulario.descripcion == 'Coevaluación directiva') {
        this.router.navigate(['evaluacion-directiva', this.idJefe, this.funcId, this.evalId]);
      } else {
        this.router.navigate(['docentes', this.idJefe, this.evalId]);
      }      
    }
  }
}