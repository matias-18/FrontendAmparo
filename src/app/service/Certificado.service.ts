import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Certificado } from "../model/Certificado";

@Injectable({
    providedIn: 'root'
})
export class CertificadoService {
    private apiUrl = 'http://localhost:8080/certificado';  

    constructor(private http: HttpClient) { }

    private getAuthHeaders(): HttpHeaders {
        const token = sessionStorage.getItem('token');
        return new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        });
      }
    
      registrarCertificado(certificado: Certificado): Observable<Certificado> {
        return this.http.post<Certificado>(this.apiUrl, certificado, { 
          headers: this.getAuthHeaders()
        });
      }
    
      listarCertificados(): Observable<Certificado[]> {
        return this.http.get<Certificado[]>(this.apiUrl, { headers: this.getAuthHeaders() });
      }
    
      actualizarCertificado(id: number, certificado: Certificado): Observable<Certificado> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.put<Certificado>(url, certificado, {
          headers: this.getAuthHeaders()
        });
      }

    
      eliminarCertificado(id: number): Observable<void> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete<void>(url, { headers: this.getAuthHeaders() });
      }

    
      obtenerCertificadosPorNombre(nombre: string): Observable<any[]> {
        const url = `${this.apiUrl}/query1/${nombre}`;
        return this.http.get<any[]>(url, { headers: this.getAuthHeaders() });
      }
}
