import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Users } from '../../../model/Users';
import { Comentario } from '../../../model/Comentario';
import { ComentarioService } from '../../../service/Comentario.service';
import { ReactiveFormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { MenuPsicologoComponent } from '../menu-psicologo/menu-psicologo.component';

@Component({
  selector: 'app-foros-psi',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MenuPsicologoComponent],
  templateUrl: './foros-psi.component.html',
  styleUrls: ['./foros-psi.component.css']  // Corregido styleUrl a styleUrls
})
export class ForosPsiComponent implements OnInit {

  comentarioForm: FormGroup;
  comentarios: Comentario[] = [];

  // Inyección de servicios
  constructor(private fb: FormBuilder, private comentarioService: ComentarioService) {
    this.comentarioForm = this.fb.group({
      description: ['', Validators.required],  // Descripción es obligatoria
      fecha: [{ value: new Date(), disabled: true }],
      anonimo: [false]  // Campo para marcar comentario como anónimo
    });
  }

  ngOnInit(): void {
    this.obtenerComentarios();  // Cargar los comentarios al iniciar
  }

  obtenerComentarios(): void {
    this.comentarioService.listarComentarios().subscribe((comentarios: Comentario[]) => {
      this.comentarios = comentarios;  // Asignar los comentarios a la lista
    });
  }

  // Usuario con rol "PSICOLOGO"
  usuario: Users = {
    id: 1,
    username: '',
    password: '',
    enabled: true,
    name: '',
    surnames: '',
    email: '',
    role: { id: 2, rol: 'PSICOLOGO' },  // Rol de Psicologo
  };

  // Método para publicar un comentario
  publicarComentario(): void {
    if (this.comentarioForm.valid) {
      const nuevoComentario: Comentario = {
        description: this.comentarioForm.get('description')?.value,
        fecha: new Date(),
        anonimo: false,  // Comentario no anónimo por defecto
        usuario: this.usuario  // Asignar el usuario con rol PSICOLOGO
      };

      this.comentarioService.registrarComentario(nuevoComentario).subscribe((comentarioRegistrado: Comentario) => {
        this.comentarios.push(comentarioRegistrado);  // Agregar el comentario registrado a la lista
        this.comentarioForm.reset({ description: '', anonimo: false, fecha: new Date() });  // Resetear el formulario
      });
    }
  }

  // Método para eliminar un comentario
  eliminarComentario(id: number): void {
    this.comentarioService.eliminarComentario(id).subscribe(() => {
      this.comentarios = this.comentarios.filter(comentario => comentario.id !== id);  // Filtrar el comentario eliminado
    });
  }
}
