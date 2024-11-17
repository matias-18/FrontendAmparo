import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Peticion } from '../../../../model/Peticion';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PeticionService } from '../../../../service/Peticion.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../../menu/menu.component';

@Component({
  selector: 'app-listar-peticion',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatPaginatorModule, MatFormFieldModule, MatSelectModule,FormsModule, MenuComponent],
  templateUrl: './listar-peticion.component.html',
  styleUrl: './listar-peticion.component.css'
})
export class ListarPeticionComponent implements OnInit {
  displayedColumns: string[] = ['cd2', 'cd3','cd6' ];
  selectedTipo: string = '';
  selectedEstado: string = '';
  dataSource= new MatTableDataSource<Peticion>();
  originalData: Peticion[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  tipos: string[] = ['Violencia Fisica', 'Violencia Psicologica', 'Violencia Sexual', 'Violencia Economica', 'Violencia Digital', 'Violencia Otro'];
  estados: string[] = ['Pendiente', 'En Proceso', 'Completado'];

  constructor(private router: Router, private snackBar: MatSnackBar, private peticionService: PeticionService) { }

  ngOnInit(): void {
    this.cargarPeticiones();
  }

  cargarPeticiones(){
    this.peticionService.listarPeticiones().subscribe(
      (response:Peticion[]) => {
        this.originalData = response;
        this.dataSource.data = response;
        this.dataSource.paginator =this.paginator;
        this.paginator._changePageSize(3);
      }
    )
  }

  aplicarFiltro() {
    let data = this.originalData;
    if (this.selectedTipo) {
      data = data.filter(peticion => peticion.tipo === this.selectedTipo);
    }

    if (this.selectedEstado) {
      data = data.filter(peticion => peticion.estado === this.selectedEstado);
    }

    this.dataSource.data = data;
  }

}
