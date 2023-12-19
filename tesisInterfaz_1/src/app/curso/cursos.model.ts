import { Alumno } from '../alumno/alumno.model';
export interface Cursos {
    id: number;
    nombre: string;
    createAt: Date;
    alumnos: Alumno[]; // Importa la interfaz Alumno si aún no lo has hecho
  }
  export interface CursoConAlumnos {
    id: number;
    nombre: string;
    createAt: Date;
    alumnos: Alumno[];
  }