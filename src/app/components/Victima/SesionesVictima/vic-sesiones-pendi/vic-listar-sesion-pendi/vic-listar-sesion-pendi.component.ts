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
  selector: 'app-vic-listar-sesion-pendi',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatPaginatorModule, MatFormFieldModule, MatSelectModule, FormsModule, RouterModule, MenuComponent],
  templateUrl: './vic-listar-sesion-pendi.component.html',
  styleUrls: ['./vic-listar-sesion-pendi.component.css']
})
export class VicListarSesionPendiComponent implements OnInit {
  displayedColumns: string[] = ['cd2', 'cd5', 'cd11', 'detalles', 'atender'];
  dataSource = new MatTableDataSource<Sesion>();
  originalData: Sesion[] = [];
  selectedTipo: string = '';
  selectedEstado: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private router: Router, private snackBar: MatSnackBar, private sesionService: SesionService) {}

  ngOnInit(): void {
    this.cargarSesiones();
  }

  
  cargarSesiones() {
    this.sesionService.listarSesiones().subscribe(
      (response: Sesion[]) => {
        this.originalData = response;
        this.dataSource.data = response;
        this.aplicarFiltro();
        this.dataSource.paginator = this.paginator;
        this.paginator._changePageSize(3);
      }
    );
  }

  verDetalleSesion(id: number) {
    this.router.navigate(['/vicdetallesesionpendi', id]);
  }

  aplicarFiltro() {
    const data = this.originalData.filter(sesion => sesion.estado === 'Pendiente');
    this.dataSource.data = data;
  }

  
  atenderSesion(sesion: Sesion): void {
    if (!sesion.id) {
      console.error("La petición no tiene un ID, por lo que no se puede actualizar.");
      return;
    }

    const updatedSesion = { ...sesion, estado: 'Realizado' };

    this.sesionService.actualizarSesion(sesion.id, updatedSesion).subscribe(
      (response) => {
        console.log('Respuesta de la API:', response);
        this.snackBar.open('Sesión marcada como realizada con éxito', 'Cerrar', { duration: 3000 });
        this.cargarSesiones();
      },
      error => {
        console.error('Error al actualizar la sesión:', error);
        this.snackBar.open('Error al actualizar la sesión', 'Cerrar', { duration: 3000 });
      }
    );
  }
}
