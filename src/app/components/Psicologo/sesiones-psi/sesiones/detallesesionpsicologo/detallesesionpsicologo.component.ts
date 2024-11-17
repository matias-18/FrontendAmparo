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
import { routes } from '../../../../../app.routes';
import { ActivatedRoute } from '@angular/router';
import { MenuPsicologoComponent } from '../../../menu-psicologo/menu-psicologo.component';


@Component({
  selector: 'app-detallesesionpsicologo',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatPaginatorModule, MatFormFieldModule, MatSelectModule,FormsModule, RouterModule, MenuPsicologoComponent],  
  templateUrl: './detallesesionpsicologo.component.html',
  styleUrl: './detallesesionpsicologo.component.css'
})
export class DetallesesionpsicologoComponent implements OnInit {
  displayedColumns: string[] = ['cd2', 'cd5', 'cd11' ];
  dataSource= new MatTableDataSource<Sesion>();
  originalData: Sesion[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  sesion: Sesion | undefined;

  constructor(private router: Router, private snackBar: MatSnackBar, private sesionService: SesionService, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.sesionService.listarSesionesporID(+id).subscribe(
        (data: Sesion) => { 
          console.log('Petición recibida:', data);
          this.sesion = data;
        },
        (error) => {
          console.error('Error fetching petition:', error);
        }
      );
    }
  }
  volver() {
    this.router.navigate(['/listarSesionPsicologo']);
  }
  

}
