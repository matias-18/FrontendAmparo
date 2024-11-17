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
import { EspecialidadService } from '../../../service/Especialidad.service';
import { Especialidad } from '../../../model/Especialidad';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-profesionales',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, CommonModule, MenuComponent],
  templateUrl: './profesionales.component.html',
  styleUrl: './profesionales.component.css'
})
export class ProfesionalesComponent {
  profesionales: string[] = [
    'PSICOLOGO', 'ABOGADO'
  ];

  selectedProfesional: string = '';
  filteredUsers: Users[] = [];
  roles:Role[] = [];
  users: Users[] = [];
  especialidades: { [key: number]: Especialidad[] } = {};

  constructor(private usersService: UsersService, private roleService: RoleService, private especialidadService: EspecialidadService) {}
  
   
      filtrarUsuarios() {
        if (this.selectedProfesional === 'PSICOLOGO') {
          this.usersService.obtenerUsuariosPsicologo().subscribe(users => {
            console.log('Usuarios Psicologo:', users);
            this.filteredUsers = users;
            this.obtenerEspecialidades(this.filteredUsers);
          });
        } else if (this.selectedProfesional === 'ABOGADO') {
          this.usersService.obtenerUsuariosAbogado().subscribe(users => {
            console.log('Usuarios Abogado:', users);
            this.filteredUsers = users;
            this.obtenerEspecialidades(this.filteredUsers);
          });
        } else if (this.selectedProfesional === '') {
          
          this.usersService.obtenerUsuariosPsicologo().subscribe(psicologos => {
            this.usersService.obtenerUsuariosAbogado().subscribe(abogados => {
              
              this.filteredUsers = [...psicologos, ...abogados];
              console.log('Usuarios Psicologo y Abogado:', this.filteredUsers);
              this.obtenerEspecialidades(this.filteredUsers);
            });
          });
        } else {
          this.filteredUsers = [];
        }
      }
      
      obtenerEspecialidades(users: Users[]) {
        users.forEach(user => {
          if (user.id !== undefined) {
            this.especialidadService.obtenerEspecialidadesPorUsuario(user.id).subscribe(especialidades => {
              this.especialidades[user.id!] = especialidades;
              especialidades.forEach(especialidad => {
                console.log(`Usuario: ${user.name}, Especialidad: ${especialidad.especialidad_nombre}`);
              });
            });
          } else {
            console.error(`El usuario ${user.name} no tiene un ID definido.`);
          }
        });
      }
      
}
