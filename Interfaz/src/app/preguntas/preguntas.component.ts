import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamenService } from '../examen.service';
import { Examen } from '../examen/examen.model';
import { CursosService } from '../cursos.service';
import { AlumnoService } from '../alumno.service';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent implements OnInit {
  examenId: any;
  examen!: Examen;
  preguntas: any[] = [];
  preguntaActual: number = 0;
  respuestaSeleccionada: any;
  respuestas: any[] = [];
  alumnoId: any;
  alumno: any = {};  
  cursoId: any;
  curso: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private examenService: ExamenService,
    private cursoService: CursosService,
    private alumnoService: AlumnoService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.alumnoId = params['alumnoId'];
      console.log(params['alumnoId']);
      this.cursoId = params['cursoId'];
      this.findEstudiante(this.alumnoId);
      this.findCurso(this.cursoId);
      this.cargarPreguntas(1);
    });    
  }

  cargarPreguntas(id: number) {
    this.examenService.getPreguntaFormulario(id).subscribe(
      (data) => {
        this.preguntas = data;
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
    this.cursoService.getCursoById(id).subscribe(
      (data) => {
        this.curso = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  seleccionarRespuesta(event: any) {
    const respuestaSeleccionada = event.target.value;
    const pregunta = this.preguntas[this.preguntaActual];
  
    if (pregunta.respuestaSeleccionada === respuestaSeleccionada) {
      pregunta.respuestaSeleccionada = undefined;
    } else {
      pregunta.respuestaSeleccionada = respuestaSeleccionada;
    }
  
    for (let i = this.preguntaActual + 1; i < this.preguntas.length; i++) {
      this.preguntas[i].respuestaSeleccionada = undefined;
    }
  
    if (this.preguntaActual < this.preguntas.length - 1) {
      this.preguntaActual++;
    } else {
      alert("Respuestas guardadas");
      this.router.navigate(['cursos', this.alumnoId]);
    }
  }
  
}
