import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Examen } from './examen/examen.model';
import { Pregunta } from './preguntas/preguntas.model';

@Injectable({
  providedIn: 'root',
})
export class ExamenService {

  private apiUrl = 'http://localhost:8083/pregunta';
  constructor(private http: HttpClient) { }

  getAllExamenes(): Observable<Examen[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getExamenById(id: number): Observable<Examen> {
    return this.http.get<Examen>(`${this.apiUrl}/${id}`);
  }

  createExamen(examenData: Examen): Observable<Examen> {
    return this.http.post<Examen>(this.apiUrl, examenData);
  }

  updateExamen(id: number, examenData: Examen): Observable<Examen> {
    return this.http.put<Examen>(`${this.apiUrl}/${id}`, examenData);
  }

  deleteExamen(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getPreguntaFormulario(id: number) {
    return this.http.get<any>(`${this.apiUrl}/formulario/${id}`);
  }
}

