import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cursos } from '../../curso/cursos.model';
@Injectable({
  providedIn: 'root',
})
export class CursosService {
  
  private apiUrl = window.location.protocol + '//' + window.location.hostname + ':8080/curso';

  constructor(private http: HttpClient) {}

  getAllCursos(): Observable<Cursos[]> {
    return this.http.get<Cursos[]>(this.apiUrl);
  }

  findById(id: number) {
    return this.http.get<any>(`${this.apiUrl}/buscar/${id}`);
  }
}
