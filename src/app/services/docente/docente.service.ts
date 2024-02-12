import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {
  private apiUrl = 'http://localhost:8084/docente';

  constructor(private http: HttpClient) {}

  findFunciones(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/funciones/${id}`);
  }

  findFuncionDirector(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/funciones/buscar/${id}`);
  }

  findById(id: string) {
    return this.http.get<any>(`${this.apiUrl}/buscar/${id}`);
  }
  
  findByJefe(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/relacion/jefe/${id}`);
  }

  findByEvaluacion(docEvaluador: string, docEvaluado: string, evalId: number) {
    return this.http.get<any>(`${this.apiUrl}/evaluacion/${docEvaluador}/${docEvaluado}/${evalId}`);
  }

  saveEvaluacion(evaluacion: any) {
    return this.http.post<any>(`${this.apiUrl}/evaluacion/registro`, evaluacion);
  }
}