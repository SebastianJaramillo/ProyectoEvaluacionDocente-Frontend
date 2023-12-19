import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  
  private apiUrl = '/api/estudiante';

  constructor(private http: HttpClient) { }
  getAllAlumnos() {
    return this.http.get<any[]>(this.apiUrl);
  }
  getAlumnoById(id: number) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
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
