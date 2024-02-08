export interface Evaluacion {
  id: number;
  estado: string;
  evalFechaInicio: string;
  evalFechaFin: Date;
  perId: number;
  nombrePeriodo?: string;
}
