import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JwtRequest } from '../../../model/JwtRequest';
import { LoginService } from '../../../service/Login.service';

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    ReactiveFormsModule
  ],
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponentPs {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }
  onSubmit() {
    if (this.loginForm.valid) {
      const loginRequest: JwtRequest = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      };
  
      this.loginService.login(loginRequest).subscribe(
        (response: any) => {
          console.log('Server response:', response); 
          const token = response.jwttoken;
          if (token && token.split('.').length === 3) {
            sessionStorage.setItem('token', token);
            const role = this.loginService.showRole();
            if (role === 'VICTIMA') {
              this.router.navigate(['/victimaHome']);
            } else if (role === 'PSICOLOGO') {
              this.router.navigate(['/psicologoHome']);
            } else if (role === 'ABOGADO') {
              this.router.navigate(['/abogadoHome']);
            } else {
              alert('No tienes permiso para acceder.');
            }
          } else {
            alert('Token inválido recibido del servidor.');
          }
        },
        (error) => {
          if (error.status === 401) {
            alert('Credenciales incorrectas.');
          } else {
            alert('Ocurrió un error. Por favor, inténtalo de nuevo más tarde.');
          }
        }
      );
    }
  }
 }