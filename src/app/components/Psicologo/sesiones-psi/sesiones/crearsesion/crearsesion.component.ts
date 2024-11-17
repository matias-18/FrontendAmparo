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
import { SesionService } from '../../../../../service/Sesion.service';
import { Sesion } from '../../../../../model/Sesion';
import { MenuPsicologoComponent } from '../../../menu-psicologo/menu-psicologo.component';


@Component({
  selector: 'app-crearsesion',
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
    MenuPsicologoComponent
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './crearsesion.component.html',
  styleUrls: ['./crearsesion.component.css'],
})
export class CrearsesionComponent implements OnInit {
  sesionForm!: FormGroup;
  todayString: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private sesionService: SesionService
  ) {
    const today = new Date();
    this.todayString = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.sesionForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha: ['',Validators.required],
      estado: ['Pendiente', Validators.required],
      tipo: ['default', Validators.required],
      hora_inicio: [
        '',
        [Validators.required, Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)] 
      ],
      hora_fin: [
        '',
        [Validators.required, Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)] 
      ],
      link_sesion: [this.generateRandomLink(), Validators.required],
      link_grabacion: [this.generateRandomLink(), Validators.required],
    });
  }


  private futureDateValidator(control: any): { [key: string]: boolean } | null {
    if (!control.value) return null;
    const inputDate = new Date(control.value);
    const today = new Date(this.todayString);

    return inputDate >= today ? null : { pastDate: true };
  }

  private generateRandomLink(): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const randomPart = Array.from({ length: 10 }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
    return `https://amparo/sesion/${randomPart}`;
  }

  registrarsesion(): void {
    if (this.sesionForm.valid) {
      this.sesionService.registrarSesion(this.sesionForm.value).subscribe(
        response => {
          this.snackBar.open('Sesión registrada exitosamente', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/crear-sesion.component']);
        },
        error => {
          console.error('Error al registrar la sesión:', error);
          this.snackBar.open('Error al registrar la sesión', 'Cerrar', { duration: 3000 });
        }
      );
    }
  }
}
