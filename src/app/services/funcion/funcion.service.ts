import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FuncionService {

  private apiUrl = window.location.protocol + '//' + window.location.hostname + ':8084/funcion';

  constructor(private http: HttpClient) {}

  findById(id: string) {
    return this.http.get<any>(`${this.apiUrl}/buscar/${id}`);
  }

  findByRol(rol: string) {
    return this.http.get<any>(`${this.apiUrl}/rol/${rol}`);
  }

  findByDescripcion(descripcion: string) {
    return this.http.get<any>(`${this.apiUrl}/descripcion/${descripcion}`);
  }
  
  findAllDocenteFuncion(){
    return this.http.get<any>(`${this.apiUrl}/docentefuncion/listar`);  
  }

  findAllFunciones(){
    return this.http.get<any>(`${this.apiUrl}/listar`);  
  }

  findDocenteFuncion(id: string){
    return this.http.get<any>(`${this.apiUrl}/docente/${id}`);  
  }

  deleteFuncionByIdCor(id: string){
    return this.http.delete<any>(`${this.apiUrl}/eliminarPorDocId/${id}`);  
  }

  createDocenteFuncionById(docenteFuncion: any){
    return this.http.post<any>(`${this.apiUrl}/DocenteFuncion/registro`, docenteFuncion);
  }

  findAllDocentesByEstado(){
    return this.http.get<any>(`${this.apiUrl}/listarDocentes`);  
  }

  findDocenteFuncionById(id: string){
    return this.http.get<any>(`${this.apiUrl}/buscarDocenteFuncion/${id}`);  
  }
}
