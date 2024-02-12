import { Formulario } from "./formulario.model";

export interface Pregunta {
  id: number;
  texto: string;
  formId: string;
  formulario: Formulario;
}
