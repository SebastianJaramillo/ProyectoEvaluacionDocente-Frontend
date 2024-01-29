import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormularioService } from '../services/formulario/formulario.service';
import { DocenteService } from '../services/docente/docente.service';

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
  docente: any = {};

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
    private docenteService: DocenteService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.idJefe = params['idJefe'];
      this.id = params['idDoc'];      
      this.formularioId = params['formId'];
      this.funcId = atob(params['funcId']);
      this.findFormulario(this.formularioId);
      this.findDocente(atob(this.id));
      this.cargarPreguntas(this.formularioId);

      switch (this.funcId) {
        case "DOC":
          this.funcId = "DOCENCIA";
          break;
        case "INV":
          this.funcId = "INVESTIGACIÓN";
          break;
        case "GES":
          this.funcId = "GESTIÓN";
          break;
        case "COR":
          this.funcId = "";
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

  guardar() {
    const pregunta = this.preguntas[this.preguntaActual];

    this.respuestas.push({
      preId: pregunta.id,
      texto: pregunta.respuestaSeleccionada,
      docEvaluado: atob(this.id)
    });

    this.formularioService.saveRespuestas(this.respuestas).subscribe(
      (data) => {
        alert('Respuestas guardadas');
        if(this.funcId == "") {
          this.router.navigate(['evaluacion-pares', this.idJefe]);
        } else {
          this.router.navigate(['docentes', this.idJefe]);
        }        
      },
      (error) => {
        console.error(error);
      }
    );
  }

  volver() {
    if(this.funcId == "") {
      this.router.navigate(['evaluacion-pares', this.idJefe]);
    } else {
      this.router.navigate(['docentes', this.idJefe]);
    }
  }
}