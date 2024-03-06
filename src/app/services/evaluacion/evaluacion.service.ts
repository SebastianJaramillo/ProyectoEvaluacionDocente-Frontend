import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EvaluacionService {

  private apiUrl = 'http://localhost:8082';

  constructor(private http: HttpClient) { }

  getPeriodosActivosInactivos() {
    return this.http.get<any[]>(`${this.apiUrl}/periodo`);
  }
  
  getAllPeriodos() {
    return this.http.get<any[]>(`${this.apiUrl}/periodo/listar`);
  }

  getPeriodoById(id: number) {
    return this.http.get<any>(`${this.apiUrl}/periodo/buscar/${id}`);
  }

  createPeriodo(periodoData: any) {
    return this.http.post<any>(`${this.apiUrl}/periodo/registro`, periodoData);
  }

  updateEstadoPeriodo(id: number, estado: string){
    return this.http.put<any[]>(`${this.apiUrl}/periodo/estado/${id}`,estado);
  }

  findByFechas(id: number) {
    return this.http.get<any>(`${this.apiUrl}/evaluacion/buscar/fechas/${id}`);
  }

  findEvaluacionByPeriodo(id: number) {
    return this.http.get<any>(`${this.apiUrl}/evaluacion/periodo/${id}`);
  }

  getAllEvaluaciones(){
    return this.http.get<any[]>(`${this.apiUrl}/evaluacion/listar`);
  }

  findEvaluacion(id: number) {
    return this.http.get<any>(`${this.apiUrl}/evaluacion/buscar/${id}`);
  }
  
  createEvaluacion(evaluacion: any){
    return this.http.post<any>(`${this.apiUrl}/evaluacion/registro`, evaluacion);
  }

  updateEstadoEvaluacion(id: number, estado: string){
    return this.http.put<any[]>(`${this.apiUrl}/evaluacion/estado/${id}`,estado);
  }

  updateEvaluacion(evaluacion:any){
    return this.http.put<any[]>(`${this.apiUrl}/evaluacion/actualizar/${evaluacion.id}`,evaluacion);
  }

  deleteEvalucion(id: number){
    return this.http.delete<any[]>(`${this.apiUrl}/evaluacion/eliminar/${id}`);
  }
}
