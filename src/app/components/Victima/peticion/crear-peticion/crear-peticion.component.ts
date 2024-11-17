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
import { PeticionService } from '../../../../service/Peticion.service';
import { MenuComponent } from '../../menu/menu.component';

@Component({
  selector: 'app-peticion',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MenuComponent
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './crear-peticion.component.html',
  styleUrl: './crear-peticion.component.css'
})
export class CrearPeticionComponent implements OnInit {
  peticionForm!: FormGroup;
  tipos = ['Violencia Fisica', 'Violencia Psicologica', 'Violencia Sexual', 'Violencia Economica', 'Violencia Digital', 'Violencia Otro'];
  tiposestado = ['Pendiente', 'En Proceso', 'Completado'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private peticionService: PeticionService
  ) {}

  ngOnInit(): void {
    this.peticionForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      estado: ['Pendiente', Validators.required],
      fecha: [new Date(), Validators.required],
      tipo: ['', Validators.required]
    });
  }

  registrarPeticion(): void {
    if (this.peticionForm.valid) {
      this.peticionService.registrarPeticion(this.peticionForm.value).subscribe(
        response => {
          this.snackBar.open('Peticion registrada exitosamente', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/crear-peticion.component']);
        },
        error => {
          console.error('Error al registrar el peticion:', error);
          this.snackBar.open('Error al registrar el peticion', 'Cerrar', { duration: 3000 });
        }
      );
    }
  }
}
