import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsersService } from '../../../service/Users.service';
import { RoleService } from '../../../service/Role.service';
import { EspecialidadService } from '../../../service/Especialidad.service';
import { Users } from '../../../model/Users';

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [CommonModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponentAb implements OnInit {
  usersForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private roleService: RoleService,
    private especialidadService: EspecialidadService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.usersForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      name: ['', Validators.required],
      surnames: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      enabled: [true],
      role: [ {id: 3, rol: 'ABOGADO'} ], 
    });
  }

  ngOnInit(): void {}

    registrar() {
      if (this.usersForm.valid) {
        const userData: Users = this.usersForm.value;
        this.usersService.registrarUsuario(userData).subscribe(
          response => {
            this.snackBar.open('Usuario registrado con éxito', 'Cerrar', {
              duration: 3000,
            });
            this.router.navigate(['/abogadoHome']); 
          },
          error => {
            this.snackBar.open('Error al registrar usuario', 'Cerrar', {
              duration: 3000,
            });
          }
        );
      }
    }
}