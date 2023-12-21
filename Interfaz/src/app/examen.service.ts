import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Examen } from './examen/examen.model';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {

  private apiUrl = '/api/examenes';
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
}
