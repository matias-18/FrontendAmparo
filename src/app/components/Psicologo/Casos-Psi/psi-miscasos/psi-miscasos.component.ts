import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import  { PeticionService } from '../../../../service/Peticion.service';	
import { Peticion } from '../../../../model/Peticion';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MenuPsicologoComponent } from '../../menu-psicologo/menu-psicologo.component';
@Component({
  selector: 'app-psi-miscasos',
  standalone: true,
  imports: [CommonModule, MenuPsicologoComponent],
  templateUrl: './psi-miscasos.component.html',
  styleUrl: './psi-miscasos.component.css'
})
export class PsiMiscasosComponent implements OnInit{
  peticion: Peticion | undefined;

  constructor(
    private route: ActivatedRoute,
    private peticionService: PeticionService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const peticionId = Number(id);
      if (isNaN(peticionId)) {
        console.error("El ID de la petición en la ruta no es un número válido.");
        return;
      }
      this.peticionService.obtenerPeticionPorId(peticionId).subscribe(
        (data: any) => {
          console.log('Petición recibida:', data);
          this.peticion = {
            id: data[3],
            titulo: data[0],
            descripcion: data[1],
            tipo: data[2],
            fecha: data[4],
            estado: data[5]
          };
          
        },
        (error) => {
          console.error('Error fetching petition:', error);
        }
      );
    } else {
      console.error("No se encontró un ID en la ruta.");
    }
  }

  volver() {
    this.router.navigate(['/psiPeticionesCaso']);
  }
}
