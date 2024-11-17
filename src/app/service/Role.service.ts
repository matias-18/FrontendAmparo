import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../model/Role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiUrl = 'http://localhost:8080/rol';  

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  registrarRol(role: Role): Observable<Role> {
    return this.http.post<Role>(this.apiUrl, role, {
      headers: this.getAuthHeaders()
    });
  }

  listarRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  actualizarRol(id: number, role: Role): Observable<Role> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Role>(url, role, {
      headers: this.getAuthHeaders()
    });
  }

  eliminarRol(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url, { headers: this.getAuthHeaders() });
  }
}
