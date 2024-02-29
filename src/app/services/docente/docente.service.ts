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
    return this.http.get<any[]>(`${this.apiUrl}/funciones/director/${id}`);
  }

  findFuncionTodos(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/funciones/todos/${id}`);
  }

  findDirector(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/director/${id}`);
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

  findByEvaluador(docEvaluador: string) {
    return this.http.get<any>(`${this.apiUrl}/evaluacion/evaluador/${docEvaluador}`);
  }

  findAllDocente(){
    return this.http.get<any>(`${this.apiUrl}/listar`);  
  }

  saveEvaluacion(evaluacion: any) {
    return this.http.post<any>(`${this.apiUrl}/evaluacion/registro`, evaluacion);
  }
  
  cambiarJefeDocente(id: string,idNuevoJefe: string){
    return this.http.post<any[]>(`${this.apiUrl}/cambiarJefe/${id}/${idNuevoJefe}`,idNuevoJefe);
  }
  
  actualizarEstadoDocenteFuncion(docenteFuncion: any){
    return this.http.post<any[]>(`${this.apiUrl}/cambiarEstado/Coordinador`,docenteFuncion);
  }
  crearDocentefuncion(docenteFuncion: any){
    return this.http.post<any[]>(`${this.apiUrl}/funcion/registro`,docenteFuncion);
  }

  cambiarEstadoDocenteFuncion(id: number){
    return this.http.get<any>(`${this.apiUrl}/funcion/desactivar/${id}`);
  }

  crearDocenteRelacion(docenteRelacion: any){
    return this.http.post<any>(`${this.apiUrl}/relacion/registro`,docenteRelacion);
  }

  findDocenteRelacionById(id: string){
    return this.http.get<any>(`${this.apiUrl}/buscarDocenteRelacion/${id}`);  
  }

  listarRelacion(){
    return this.http.get<any[]>(`${this.apiUrl}/relacion/listar`);  
  }
}
