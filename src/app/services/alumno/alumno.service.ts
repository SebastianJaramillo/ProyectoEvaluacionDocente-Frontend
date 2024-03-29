import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AlumnoService {
  
  private apiUrl = window.location.protocol + '//' + window.location.hostname + ':8080/estudiante';

  constructor(private http: HttpClient) {}
  getAllAlumnos() {
    return this.http.get<any[]>(`${this.apiUrl}/listar`);
  }
  getAlumnoById(id: string) {
    return this.http.get<any>(`${this.apiUrl}/buscar/${id}`);
  }
  findByAlumno(id: string, evalId: any) {
    return this.http.get<any>(`${this.apiUrl}/cursos/${id}/${evalId}`);
  }
  updateEstadoEval(cursoEstudiante: any) {
    return this.http.put<any>(`${this.apiUrl}/curso/evaluacion`, cursoEstudiante);
  }
}

