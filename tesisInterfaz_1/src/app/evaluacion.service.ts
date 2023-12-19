import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EvaluacionService {

  private apiUrl = '/api/';

  constructor(private http: HttpClient) { }

  getAllAlumnos() {
    return this.http.get<any[]>(this.apiUrl);
  }
}
