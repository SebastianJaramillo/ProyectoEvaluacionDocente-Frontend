import { Preguntas } from '../preguntas/preguntas.model'
export interface Examen {
    id: number;
    nombre: string;
    createAt: Date;
    preguntas: Preguntas[];
  }
  