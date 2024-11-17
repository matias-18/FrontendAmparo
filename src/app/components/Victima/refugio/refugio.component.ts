import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Refugio } from '../../../model/Refugio';
import { RefugioService } from '../../../service/Refugio.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-refugio',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, CommonModule, MenuComponent],
  templateUrl: './refugio.component.html',
  styleUrl: './refugio.component.css'
})
export class RefugioComponent {
  departamentos: string[] = [
    'Amazonas', 'Arequipa', 'Apurimac', 'Arequipa', 'Ayacucho', 'Cajamarca',
    'Cusco', 'Huancavelica', 'Huanuco', 'Ica', 'Junin', 'La Libertad', 'Lambayeque',
    'Lima', 'Loreto', 'Madre de Dios', 'Moquegua', 'Pasco', 'Piura', 'Puno', 'San Martin',
    'Tacna', 'Tumbes', 'Ucayali',
  ];

  distritos: string[] = [
    'Ancón', 'Ate', 'Barranco', 'Breña', 'Carabayllo', 'Chaclacayo', 'Chorrillos', 'Cieneguilla',
    'Comas', 'El Agustino', 'Independencia', 'Jesús María', 'La Molina', 'La Victoria', 'Lince',
    'Los Olivos', 'Lurigancho', 'Lurín', 'Magdalena del Mar', 'Miraflores', 'Pachacámac', 'Pucusana',
    'Pueblo Libre', 'Puente Piedra', 'Punta Hermosa', 'Punta Negra', 'Rímac', 'San Bartolo', 'San Borja',
    'San Isidro', 'San Juan de Lurigancho', 'San Juan de Miraflores', 'San Luis', 'San Martín de Porres',
    'San Miguel', 'Santa Anita', 'Santa María del Mar', 'Santa Rosa', 'Santiago de Surco', 'Surquillo',
    'Villa El Salvador', 'Villa María del Triunfo'
  ];

  selectedDepartamento: string = '';
  selectedDistrito: string = '';
  refugiosFiltrados: Refugio[] = [];
  noResults: boolean = false;

  constructor(private refugioService: RefugioService, private snackBar: MatSnackBar) {}

  filtrarRefugios(): void {
    if (this.selectedDepartamento) {
      this.refugioService.buscarRefugiosPorDepartamento(this.selectedDepartamento)
        .subscribe((result: any[]) => {
          this.refugiosFiltrados = result.map(refugio => {
            return {
              nombre: refugio[0],
              departamento: refugio[1],
              distrito: refugio[2],
              direccion: refugio[3],
              telefono: refugio[4]
            };
          }).filter(refugio =>
            (!this.selectedDistrito || refugio.distrito.trim().toLowerCase() === this.selectedDistrito.trim().toLowerCase())
          );

          if (this.refugiosFiltrados.length === 0) {
            this.noResults = true;
            this.snackBar.open('No se encontraron refugios', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            });
          } else {
            this.noResults = false;
          }
        });
    } else if (this.selectedDistrito) {
      this.refugioService.buscarRefugiosPorDistrito(this.selectedDistrito)
        .subscribe((result: any[]) => {
          this.refugiosFiltrados = result.map(refugio => {
            return {
              nombre: refugio[0],
              departamento: refugio[1],
              distrito: refugio[2],
              direccion: refugio[3],
              telefono: refugio[4]
            };
          });

          if (this.refugiosFiltrados.length === 0) {
            this.noResults = true;
            this.snackBar.open('No se encontraron refugios', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            });
          } else {
            this.noResults = false;
          }
        });
    } else {
      this.refugioService.listarRefugios()
        .subscribe((result: any[]) => {
          console.log("Datos recibidos sin filtros:", result);

          this.refugiosFiltrados = result;

          if (this.refugiosFiltrados.length === 0) {
            this.noResults = true;
            this.snackBar.open('No se encontraron refugios', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            });
          } else {
            this.noResults = false;
          }
        });
    }
  }

  redirectToGoogle() {
    window.location.href = 'https://www.google.com';
  }
}
