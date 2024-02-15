import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {

  private apiUrl = 'http://localhost:8083';

  constructor(private http: HttpClient) { }
  
  getPreguntaFormulario(id: number) {
    return this.http.get<any[]>(`${this.apiUrl}/pregunta/formulario/${id}`);
  }

  findById(id: number) {
    return this.http.get<any[]>(`${this.apiUrl}/formulario/buscar/${id}`);
  }

  saveRespuestas(respuestas: any[]) {
    return this.http.post<any>(`${this.apiUrl}/respuesta/registro`, respuestas);
  }
  getFormularioListar(){
    return this.http.get<any[]>(`${this.apiUrl}/formulario/listar`);
  }
  saveFormulario(formulario: any) {
    return this.http.post<any>(`${this.apiUrl}/formulario/registro`, formulario);
  }

  savePregunta(pregunta: any) {
      console.log("ingreso pregunta 2",pregunta);
      return this.http.post<any>(`${this.apiUrl}/pregunta/registro`, pregunta);
    
  }
  actualizarPregunta(pregunta: any){
    return this.http.put<any>(`${this.apiUrl}/pregunta/actualizar/${pregunta.id}`, pregunta);
      
  }
  deleteFormulario(id: number) {
    return this.http.delete<any>(`${this.apiUrl}/formulario/eliminar/${id}`);
  }
  
  deletePregunta(id: number) {
    return this.http.delete<any>(`${this.apiUrl}/pregunta/eliminar/${id}`);
  }
  findByNombre(nombre: string){
    return this.http.get<any>(`${this.apiUrl}/formulario/filtrar/${nombre}`);
  }

  resultados(preId: any, docEvaluado: any, evalId: number) {
    return this.http.get<any[]>(`${this.apiUrl}/respuesta/resultados/${preId}/${docEvaluado}/${evalId}`);
  }
}
