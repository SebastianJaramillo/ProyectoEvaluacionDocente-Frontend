import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EvaluacionService {

  private apiUrl = 'http://localhost:8082/periodo';

  constructor(private http: HttpClient) { }
  getAllPeriodos() {
    return this.http.get<any[]>(`${this.apiUrl}/listar`);
  }
  getPeriodoById(id: number) {
    return this.http.get<any>(`${this.apiUrl}/buscar/${id}`);
  }
  createPeriodo(periodoData: any) {
    return this.http.post<any>(this.apiUrl, periodoData);
  }
}
