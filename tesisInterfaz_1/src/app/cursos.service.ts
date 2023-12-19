import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cursos } from './curso/cursos.model';
import { CursoConAlumnos } from './curso/cursos.model';
@Injectable({
  providedIn: 'root'
})

export class CursosService {
  private apiUrl = '/api/cursos';

  constructor(private http: HttpClient) { }
  
  eliminarAlumnoDelCurso(cursoId: number, alumnoId: number): Observable<any> {
    const url = `${this.apiUrl}/${cursoId}/eliminar-alumnos?alumnoId=${alumnoId}`;
    return this.http.delete<any>(url, {});
  }
  getCursos(): Observable<Cursos[]> {
    return this.http.get<Cursos[]>(this.apiUrl);
  }
  asignarAlumnos(cursoId: number, alumnos: any[]): Observable<any> {
    const url = `${this.apiUrl}/${cursoId}/asignar-alumnos`;
    return this.http.put<any>(url, alumnos);
  }

  obtenerCursosPorAlumnos(alumnoId: number): Observable<any>{
    const url = `${this.apiUrl}/estudiantes/${alumnoId}`;
    return this.http.delete<any>(url, {});
  }
// Resto de los métodos del servicio...

getAlumnosPorCurso(cursoId: number) {
  return this.http.get<CursoConAlumnos>(`${this.apiUrl}/${cursoId}`);
}
  getAllCursos(): Observable<Cursos[]> {
    return this.http.get<Cursos[]>(this.apiUrl);
  }

  getCursosById(id: number): Observable<Cursos> {
    return this.http.get<Cursos>(`${this.apiUrl}/${id}`);
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
