import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Peticion } from '../../../model/Peticion';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PeticionService } from '../../../service/Peticion.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MenuPsicologoComponent } from '../menu-psicologo/menu-psicologo.component';

@Component({
  selector: 'app-peticiones-psi',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatPaginatorModule, MatFormFieldModule, MatSelectModule, FormsModule, HttpClientModule, MenuPsicologoComponent],
  templateUrl: './peticiones-psi.component.html',
  styleUrls: ['./peticiones-psi.component.css']
})
export class PeticionesPsiComponent implements OnInit {
  displayedColumns: string[] = [ 'cd2', 'cd4', 'cd5', 'acciones' , 'atender' ];
  dataSource = new MatTableDataSource<Peticion>();
  originalData: Peticion[] = [];
  selectedTipo: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  tipos: string[] = ['Violencia Fisica', 'Violencia Psicologica', 'Violencia Sexual', 'Violencia Economica', 'Violencia Digital', 'Violencia Otro'];
  constructor(private router: Router, private snackBar: MatSnackBar, private peticionService: PeticionService) {}

  ngOnInit(): void {
    this.cargarPeticiones();
  }

  cargarPeticiones() {
    this.peticionService.listarPeticiones().subscribe(
      (response: Peticion[]) => {
        this.originalData = response;
        this.aplicarFiltro();
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  aplicarFiltro() {
    let data = this.originalData.filter(peticion => peticion.estado === 'Pendiente');

    if (this.selectedTipo) {
      data = data.filter(peticion => peticion.tipo === this.selectedTipo);
    }

    this.dataSource.data = data;
  }

  verDetalleCaso(id: number) {
    this.router.navigate(['/psiCasoDescripcion', id]);
  }

  atenderPeticion(peticion: Peticion) {
    if (!peticion.id) {
      console.error("La petición no tiene un ID, por lo que no se puede actualizar.");
      return;
    }
    
    peticion.estado = 'En Proceso';
    
    this.peticionService.actualizarPeticion(peticion.id, peticion).subscribe(() => {
      this.snackBar.open('Petición atendida con éxito', 'Cerrar', { duration: 3000 });
      this.cargarPeticiones();
    });
  }


  
}
