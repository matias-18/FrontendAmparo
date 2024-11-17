import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Refugio } from '../model/Refugio';

@Injectable({
  providedIn: 'root'
})
export class RefugioService {
  private apiUrl = 'http://localhost:8080/refugio';  

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  
  registrarRefugio(refugio: Refugio): Observable<Refugio> {
    return this.http.post<Refugio>(this.apiUrl, refugio, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  
  listarRefugios(): Observable<Refugio[]> {
    return this.http.get<Refugio[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  
  actualizarRefugio(id: number, refugio: Refugio): Observable<Refugio> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Refugio>(url, refugio, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  
  eliminarRefugio(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  
  buscarRefugiosPorDepartamento(departamento: string): Observable<Refugio[]> {
    const url = `${this.apiUrl}/departamento/${departamento}`;
    return this.http.get<Refugio[]>(url, { headers: this.getAuthHeaders() });
  }

  
  buscarRefugiosPorDistrito(distrito: string): Observable<Refugio[]> {
    const url = `${this.apiUrl}/distrito/${distrito}`;
    return this.http.get<Refugio[]>(url, { headers: this.getAuthHeaders() });
  }

  
  buscarRefugiosPorDepartamentoYDistrito(departamento: string, distrito: string): Observable<Refugio[]> {
    const url = `${this.apiUrl}/filtro?departamento=${departamento}&distrito=${distrito}`;
    return this.http.get<Refugio[]>(url, { headers: this.getAuthHeaders() });
  }
}