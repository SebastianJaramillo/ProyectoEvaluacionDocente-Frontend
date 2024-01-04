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

// Resto de los métodos del servicio...

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

  getPreguntasPorExamen(examenId: number): Observable<Pregunta[]> {
    //const url = `${this.apiUrl}/listar/${examenId}`; // Reemplaza según la estructura de tu API
    //return this.http.get<Pregunta[]>(url);
    const url = `${this.apiUrl}/buscar/41`; // Reemplaza según la estructura de tu API
    return this.http.get<Pregunta[]>(url);
  }
}

