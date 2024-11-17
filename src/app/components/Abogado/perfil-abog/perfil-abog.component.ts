import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Users } from '../../../model/Users';
import { MenuAbogComponent } from '../menu-abog/menu-abog.component';

@Component({
  selector: 'app-perfil-abog',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MenuAbogComponent],
  templateUrl: './perfil-abog.component.html',
  styleUrl: './perfil-abog.component.css',
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ]
})
export class PerfilAbogComponent implements OnInit{
  userName: string = '';
  userForm: FormGroup;
  isEditable: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private jwtHelper: JwtHelperService) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      surnames: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
    this.userForm.disable();
  }

  ngOnInit(): void {
    this.setUserName();
  }

    setUserName(): void {
      const token = sessionStorage.getItem('token');
      if (token) {
        const decodedToken = this.jwtHelper.decodeToken(token);
        console.log('Token decodificado:', decodedToken); 
        this.userName = decodedToken?.nombre || decodedToken?.sub || 'Usuario';
        
        this.userForm.patchValue({
          name: decodedToken?.nombre || '',
          surnames: decodedToken?.surnames || '',
          email: decodedToken?.email || ''
        });
      }
    }

  onSubmit() {
    if (this.userForm.valid) {
      const user: Users = this.userForm.value;
      console.log("Usuario guardado:", user);
      this.toggleEdit(); 
    } else {
      console.log("Formulario no válido");
    }
  }

  logout() {
    console.log("Cerrando sesión...");
    this.router.navigate(['/inicioAb']); 
  }

  toggleEdit() {
    this.isEditable = !this.isEditable;
    if (this.isEditable) {
      this.userForm.enable(); 
    } else {
      this.userForm.disable(); 
    }
  }

  get name() {
    return this.userForm.get('name');
  }

  get surnames() {
    return this.userForm.get('surnames');
  }

  get email() {
    return this.userForm.get('email');
  }

}
