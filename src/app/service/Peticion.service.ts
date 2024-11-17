import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Peticion } from "../model/Peticion";

@Injectable({
    providedIn: 'root'
})
export class PeticionService {
    private apiUrl = 'http://localhost:8080/peticion';  

    constructor(private http: HttpClient) { }

    private getAuthHeaders(): HttpHeaders {
        const token = sessionStorage.getItem('token');
        return new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        });
      }
    
      registrarPeticion(peticion: Peticion): Observable<Peticion> {
        return this.http.post<Peticion>(this.apiUrl, peticion, {
          headers: this.getAuthHeaders()
        });
      }
    
      listarPeticiones(): Observable<Peticion[]> {
        return this.http.get<Peticion[]>(this.apiUrl, { headers: this.getAuthHeaders() });
      }
    
      actualizarPeticion(id: number, peticion: Peticion): Observable<Peticion> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.put<Peticion>(url, peticion, {
          headers: this.getAuthHeaders()
        });
      }
    

    
      eliminarPeticion(id: number): Observable<void> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete<void>(url, { headers: this.getAuthHeaders() });
      }
    
      peticionIntervaloFecha(startDate: string, endDate: string): Observable<any> {
        const url = `${this.apiUrl}/intervalo-fecha?startDate=${startDate}&endDate=${endDate}`;
        return this.http.get<any>(url, { headers: this.getAuthHeaders() });
      }
    
      peticionTipo(tipo: string): Observable<any> {
        const url = `${this.apiUrl}/tipo/${tipo}`;
        return this.http.get<any>(url, { headers: this.getAuthHeaders() });
      }
    
      peticionEstado(estado: string): Observable<any> {
        const url = `${this.apiUrl}/estado/${estado}`;
        return this.http.get<any>(url, { headers: this.getAuthHeaders() });
      }

      obtenerPeticionPorId(id: number): Observable<Peticion> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.get<Peticion>(url, { headers: this.getAuthHeaders() });
      }
}
