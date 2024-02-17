import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {
  private apiUrl = 'http://localhost:8084/docente';

  constructor(private http: HttpClient) {}

  listar(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/listar`);
  }

  findFunciones(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/funciones/${id}`);
  }

  findFuncionDirector(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/funciones/director/${id}`);
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
  findAllDocente(){
    return this.http.get<any>(`${this.apiUrl}/listar`);  
  }

  saveEvaluacion(evaluacion: any) {
    return this.http.post<any>(`${this.apiUrl}/evaluacion/registro`, evaluacion);
  }
  
  cambiarRolCoodinador(id: string, rol: string){
    return this.http.get<any>(`${this.apiUrl}/listar`);  
  }

  cambiarJefeDocente(id: string,idNuevoJefe: string){
    return this.http.post<any[]>(`${this.apiUrl}/cambiarJefe/${id}/${idNuevoJefe}`,idNuevoJefe);
  }

}
