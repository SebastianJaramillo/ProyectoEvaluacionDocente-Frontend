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

  findById(id: string) {
    return this.http.get<any>(`${this.apiUrl}/buscar/${id}`);
  }
}
