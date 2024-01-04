import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cursos } from './curso/cursos.model';
@Injectable({
  providedIn: 'root',
})
export class CursosService {
  private apiUrl = 'http://localhost:8080/estudiante';

  constructor(private http: HttpClient) {}

  eliminarAlumnoDelCurso(cursoId: number, alumnoId: number): Observable<any> {
    const url = `${this.apiUrl}/${cursoId}/eliminar-alumnos?alumnoId=${alumnoId}`;
    return this.http.delete<any>(url, {});
  }
  getCursos(): Observable<Cursos[]> {
    return this.http.get<Cursos[]>(this.apiUrl);
  }

  getCursoById(id: number): Observable<Cursos> {
    return this.http.get<any>(`http://localhost:8080/curso/buscar/${id}`);
  }

  asignarAlumnos(cursoId: number, alumnos: any[]): Observable<any> {
    const url = `${this.apiUrl}/${cursoId}/asignar-alumnos`;
    return this.http.put<any>(url, alumnos);
  }

  obtenerCursosPorAlumnos(alumnoId: string): Observable<any> {
    const url = `${this.apiUrl}/cursos/${alumnoId}`;
    return this.http.get<Cursos[]>(url);
  }
  // Resto de los métodos del servicio...
  
  getAllCursos(): Observable<Cursos[]> {
    return this.http.get<Cursos[]>(this.apiUrl);
  }

  createCurso(cursoData: Cursos): Observable<Cursos> {
    return this.http.post<Cursos>(this.apiUrl, cursoData);
  }

  updateCurso(id: number, cursoData: Cursos): Observable<Cursos> {
    return this.http.put<Cursos>(`${this.apiUrl}/${id}`, cursoData);
  }

  deleteCurso(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
