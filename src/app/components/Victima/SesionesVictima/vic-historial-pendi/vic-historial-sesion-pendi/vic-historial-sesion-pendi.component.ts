import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { SesionService } from '../../../../../service/Sesion.service';
import { Sesion } from '../../../../../model/Sesion';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MenuComponent } from '../../../menu/menu.component';

@Component({
  selector: 'app-vic-historial-sesion-pendi',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatPaginatorModule, MatFormFieldModule, MatSelectModule,FormsModule, RouterModule, MenuComponent],
  templateUrl: './vic-historial-sesion-pendi.component.html',
  styleUrl: './vic-historial-sesion-pendi.component.css'
})
export class VicHistorialSesionPendiComponent {
  displayedColumns: string[] = ['cd2', 'cd5', 'cd11','detalles' ];
  dataSource= new MatTableDataSource<Sesion>();
  originalData: Sesion[] = [];
  tipos: string[] = ['Violencia Fisica', 'Violencia Psicologica', 'Violencia Sexual', 'Violencia Economica', 'Violencia Digital', 'Violencia Otro'];
  estados: string[] = ['Pendiente', 'En Proceso', 'Completado'];
  selectedTipo: string = '';
  selectedEstado: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private router: Router, private snackBar: MatSnackBar, private sesionService: SesionService) { }

  ngOnInit(): void {
    this.cargarSesiones();
  }

  cargarSesiones(){
    this.sesionService.listarSesiones().subscribe(
      (response:Sesion[]) => {
        this.originalData = response;
        this.dataSource.data = response;
       this.aplicarFiltro();
        this.dataSource.paginator =this.paginator;
        this.paginator._changePageSize(3);
      }
    )
  }

  verDetalleSesion(id: number) {
    this.router.navigate(['/vicdetallesesionhistorial', id]);
  }
  aplicarFiltro() {

    let data = this.originalData.filter(sesion => sesion.estado === 'Realizado');

    this.dataSource.data = data;
  }

}
