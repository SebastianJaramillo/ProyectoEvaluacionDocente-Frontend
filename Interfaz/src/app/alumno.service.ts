import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  
  private apiUrl = 'http://localhost:8080/estudiante';

  constructor(private http: HttpClient) { }
  getAllAlumnos() {
    return this.http.get<any[]>(`${this.apiUrl}/listar`);
  }
  getAlumnoById(id: number) {
    return this.http.get<any>(`${this.apiUrl}/buscar/${id}`);
  }
  createAlumno(alumnoData: any) {
    return this.http.post<any>(this.apiUrl, alumnoData);
  }
  updateAlumno(id: number, alumnoData: any) {
    return this.http.put<any>(`${this.apiUrl}/${id}`, alumnoData);
  }
  deleteAlumno(id: number) {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

}
