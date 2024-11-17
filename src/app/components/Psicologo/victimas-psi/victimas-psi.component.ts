import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Users } from '../../../model/Users';
import { UsersService } from '../../../service/Users.service';
import { RoleService } from '../../../service/Role.service';
import { Role } from '../../../model/Role';
import { MenuPsicologoComponent } from '../menu-psicologo/menu-psicologo.component';


@Component({
  selector: 'app-victimas-psi',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, CommonModule, MenuPsicologoComponent],
  templateUrl: './victimas-psi.component.html',
  styleUrl: './victimas-psi.component.css'
})
export class VictimasPsiComponent implements OnInit {
  filteredUsers: Users[] = [];
  searchTerm: string = '';

  constructor(private usersService: UsersService, private roleService: RoleService) {}

  ngOnInit() {
    this.filtrarUsuarios();
  }
  
  filtrarUsuarios() {
    this.usersService.obtenerUsuariosVictima().subscribe(victimas => {
        this.filteredUsers = [...victimas];
        console.log('Usuarios Victimas:', this.filteredUsers);     
      });
    };
  
  
}

