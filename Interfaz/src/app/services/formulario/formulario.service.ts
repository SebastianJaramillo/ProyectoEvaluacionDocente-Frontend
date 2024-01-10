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
}
