import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PeticionUsuario } from '../model/PeticionUsuario';

@Injectable({
  providedIn: 'root'
})
export class PeticionUsuarioService {
  private apiUrl = 'http://localhost:8080/peticionUsuario';  

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  registrarPeticionUsuario(peticionUsuario: PeticionUsuario): Observable<PeticionUsuario> {
    return this.http.post<PeticionUsuario>(this.apiUrl, peticionUsuario, {
      headers: this.getAuthHeaders()
    });
  }

  listarPeticionesUsuarios(): Observable<PeticionUsuario[]> {
    return this.http.get<PeticionUsuario[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  actualizarPeticionUsuario(id: number, peticionUsuario: PeticionUsuario): Observable<PeticionUsuario> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<PeticionUsuario>(url, peticionUsuario, {
      headers: this.getAuthHeaders()
    });
  }

  eliminarPeticionUsuario(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url, { headers: this.getAuthHeaders() });
  }
}
