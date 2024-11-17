import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../model/Users';
import { Role } from '../model/Role';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:8080/users';  

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  registrarUsuario(users: Users): Observable<Users> {
    return this.http.post<Users>(this.apiUrl, users, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  listarUsuarios(): Observable<Users[]> {
    return this.http.get<Users[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  actualizarUsuario(id: number, users: Users): Observable<Users> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Users>(url, users, {
      headers: this.getAuthHeaders()
    });
  }

  eliminarUsuario(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url, { headers: this.getAuthHeaders() });
  }

  obtenerUsuariosPsicologo(): Observable<Users[]> {
    const url = `${this.apiUrl}/psicologo`;  
    return this.http.get<Users[]>(url, { headers: this.getAuthHeaders() });
  }

  obtenerUsuariosAbogado(): Observable<Users[]> {
    const url = `${this.apiUrl}/abogado`;  
    return this.http.get<Users[]>(url, { headers: this.getAuthHeaders() });
  }

  obtenerUsuariosVictima(): Observable<Users[]> {
    const url = `${this.apiUrl}/victima`;  
    return this.http.get<Users[]>(url, { headers: this.getAuthHeaders() });
  }
  getUserByUsername(username: string): Observable<Users> {
    const url = `${this.apiUrl}/username/${username}`;
    return this.http.get<Users>(url, { headers: this.getAuthHeaders() });
  }
}