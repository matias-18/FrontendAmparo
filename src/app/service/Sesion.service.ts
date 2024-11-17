import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sesion } from '../model/Sesion';

@Injectable({
  providedIn: 'root'
})
export class SesionService {
  private apiUrl = 'http://localhost:8080/sesion';  

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
  
  registrarSesion(sesion: Sesion): Observable<Sesion> {
    return this.http.post<Sesion>(this.apiUrl, sesion, {
      headers: this.getAuthHeaders()
    });
  }
  
  listarSesiones(): Observable<Sesion[]> {
    return this.http.get<Sesion[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  actualizarSesion(id: number, sesion: Sesion): Observable<Sesion> {
    return this.http.put<Sesion>(`${this.apiUrl}/${id}`, sesion, {
      headers: this.getAuthHeaders()
    });
  }

  eliminarSesion(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url, { headers: this.getAuthHeaders() });
  }

  
  obtenerSesionPorFechaIntervalo(startDate: string, endDate: string): Observable<Object[]> {
    const url = `${this.apiUrl}/fecha-intervalo?startDate=${startDate}&endDate=${endDate}`;
    return this.http.get<Object[]>(url, { headers: this.getAuthHeaders() });
  }

  listarSesionesporID(id: number): Observable<Sesion> {
    return this.http.get<Sesion>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
  
}
