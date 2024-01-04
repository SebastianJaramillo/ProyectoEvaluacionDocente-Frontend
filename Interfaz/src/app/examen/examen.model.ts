import { Pregunta } from '../preguntas/preguntas.model'
export interface Examen {
    id: number;
    nombre: string;
    pregunta: Pregunta[];
  }
