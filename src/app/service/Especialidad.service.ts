import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Especialidad } from "../model/Especialidad";

@Injectable({
    providedIn: 'root'
})
export class EspecialidadService {
    private apiUrl = 'http://localhost:8080/especialidad';  

    constructor(private http: HttpClient) { }

    private getAuthHeaders(): HttpHeaders {
        const token = sessionStorage.getItem('token');
        return new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        });
      }
    
      registrarEspecialidad(especialidad: Especialidad): Observable<Especialidad> {
        return this.http.post<Especialidad>(this.apiUrl, especialidad, { 
          headers: this.getAuthHeaders()
        });
      }
    
      listarEspecialidades(): Observable<Especialidad[]> {
        return this.http.get<Especialidad[]>(this.apiUrl, { headers: this.getAuthHeaders() });
      }
    

   
      actualizarEspecialidad(id: number, especialidad: Especialidad): Observable<Especialidad> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.put<Especialidad>(url, especialidad, {
          headers: this.getAuthHeaders()
        });
      }
    
      eliminarEspecialidad(id: number): Observable<void> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete<void>(url, { headers: this.getAuthHeaders() });
      }
    
      especialidadQuery1(nombre: string): Observable<any> {
        const url = `${this.apiUrl}/query1/${nombre}`;
        return this.http.get<any>(url, { headers: this.getAuthHeaders() });
      }
    
      obtenerEspecialidadesPorUsuario(usuarioId: number): Observable<Especialidad[]> {
        const url = `${this.apiUrl}/usuario/${usuarioId}`;
        return this.http.get<Especialidad[]>(url, { headers: this.getAuthHeaders() });
      }
}
