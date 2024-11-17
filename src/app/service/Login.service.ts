import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtRequest } from "../model/JwtRequest";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:8080/authenticate'; 
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  _username: string = '';
  idUsuario: number = 0;

  setusername(value: string) {
    this._username = value;
  }

  setid(value: number) {
    this.idUsuario = value;
  }

  getId() {
    return this.idUsuario;
  }

  getusername(): string {
    return this._username;
  }

  login(request: JwtRequest) {
    return this.http.post(this.apiUrl, request);
  }

  verificar() {
    let token = sessionStorage.getItem('token');
    return token != null;
  }

  showRole() {
    let token = sessionStorage.getItem('token');
    if (!token) {
      return null;
    }
    try {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken?.role;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
}