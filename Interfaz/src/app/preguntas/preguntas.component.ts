import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamenService } from '../examen.service';
import { Examen } from '../examen/examen.model';
import { Respuesta } from '../respuestas/respuesta.model';
import { Pregunta } from '../preguntas/preguntas.model';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent implements OnInit {
  examenId: any;
  examen!: Examen;
  preguntas: any[] = [];
  preguntaActual!: Pregunta | undefined;
  respuestaSeleccionada: any;
  respuestas: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private examenService: ExamenService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      //this.examenId = +params['examenId'];
      this.examenId = 22;
      this.cargarPreguntas();
    });
  }

  cargarPreguntas() {
    this.examenService.getPreguntasPorExamen(this.examenId).subscribe(
      (preguntas: Pregunta[]) => {
        this.preguntas = preguntas;
        this.mostrarSiguientePregunta();
      },
      (error) => {
        console.error('Error al cargar preguntas', error);
      }
    );
  }

  mostrarSiguientePregunta() {
    this.respuestaSeleccionada = null;
    if (this.preguntas.length > 0) {
      const pregunta = this.preguntas.shift();
      if (pregunta) {
        this.preguntaActual = pregunta;
      }
    } else {
      // Todas las preguntas han sido mostradas
      this.preguntaActual = undefined;
    }
  }
  

  seleccionarRespuesta(): void {
    // Asumo que la propiedad `respuestaSeleccionada` contiene el ID de la respuesta seleccionada
    // Aquí deberías implementar la lógica para manejar la respuesta seleccionada
    console.log('Respuesta seleccionada:', this.respuestaSeleccionada);
  }

  siguientePregunta(): void {
    // Asumo que la propiedad `preguntaActual` se ha asignado correctamente
    // Aquí deberías implementar la lógica para cargar la siguiente pregunta
    this.mostrarSiguientePregunta();
  }
}
