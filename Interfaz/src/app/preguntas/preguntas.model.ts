import { Respuesta } from '../respuestas/respuesta.model'
export interface Pregunta {
  id: number;
  enunciado: string;
  respuesta: Respuesta;
}