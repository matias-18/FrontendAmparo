import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Comentario } from "../model/Comentario";

@Injectable({
    providedIn: 'root'
})
export class ComentarioService {
  private apiUrl = 'http://localhost:8080/comentario';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  registrarComentario(comentario: Comentario): Observable<Comentario> {
    const headers = this.getAuthHeaders();
    return this.http.post<Comentario>(this.apiUrl, comentario, { headers });
  }

  listarComentarios(): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  actualizarComentario(id: number, comentario: Comentario): Observable<Comentario> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Comentario>(url, comentario, {
      headers: this.getAuthHeaders()
    });
  }

  eliminarComentario(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url, { headers: this.getAuthHeaders() });
  }
}