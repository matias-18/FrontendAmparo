import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Documento } from "../model/Documento";

@Injectable({
    providedIn: 'root'
})
export class DocumentoService {
    private apiUrl = 'http://localhost:8080/documento';  

    constructor(private http: HttpClient) { }

    private getAuthHeaders(): HttpHeaders {
        const token = sessionStorage.getItem('token');
        return new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        });
      }
    
      registrarDocumento(documento: Documento): Observable<Documento> {
        return this.http.post<Documento>(this.apiUrl, documento, { 
          headers: this.getAuthHeaders()
        });
      }
    
      listarDocumentos(): Observable<Documento[]> {
        return this.http.get<Documento[]>(this.apiUrl, { headers: this.getAuthHeaders() });
      }

      actualizarDocumento(id: number, documento: Documento): Observable<Documento> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.put<Documento>(url, documento, {
          headers: this.getAuthHeaders()
        });
      }
    
      eliminarDocumento(id: number): Observable<void> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete<void>(url, { headers: this.getAuthHeaders() });
      }
}
