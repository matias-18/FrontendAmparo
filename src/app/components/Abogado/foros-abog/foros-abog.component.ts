import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Users } from '../../../model/Users';
import { Comentario } from '../../../model/Comentario';
import { ComentarioService } from '../../../service/Comentario.service';
import { ReactiveFormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { MenuAbogComponent } from '../menu-abog/menu-abog.component';

@Component({
  selector: 'app-foros-abog',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MenuAbogComponent],
  templateUrl: './foros-abog.component.html',
  styleUrls: ['./foros-abog.component.css']  // Corregido styleUrl a styleUrls
})
export class ForosAbogComponent implements OnInit {

  comentarioForm: FormGroup;
  comentarios: Comentario[] = [];

  // Inyectar los servicios en el constructor
  constructor(private fb: FormBuilder, private comentarioService: ComentarioService) {
    this.comentarioForm = this.fb.group({
      description: ['', Validators.required],   // Descripción es obligatorio
      fecha: [{ value: new Date(), disabled: true }],
      anonimo: [false] // Campo para indicar si es anónimo
    });
  }

  ngOnInit(): void {
    this.obtenerComentarios();  // Cargar comentarios al iniciar
  }

  obtenerComentarios(): void {
    this.comentarioService.listarComentarios().subscribe((comentarios: Comentario[]) => {
      this.comentarios = comentarios;  // Actualizar lista de comentarios
    });
  }

  // Definición del usuario con rol de "ABOGADO"
  usuario: Users = {
    id: 1,
    username: '',
    password: '',
    enabled: true,
    name: '',
    surnames: '',
    email: '',
    role: { id: 3, rol: 'ABOGADO' },  // Rol de abogado
  };

  // Método para publicar un nuevo comentario
  publicarComentario(): void {
    if (this.comentarioForm.valid) {
      const nuevoComentario: Comentario = {
        description: this.comentarioForm.get('description')?.value,
        fecha: new Date(),
        anonimo: false,  // Comentario no anónimo por defecto
        usuario: this.usuario  // Asociar el comentario con el usuario "ABOGADO"
      };

      this.comentarioService.registrarComentario(nuevoComentario).subscribe((comentarioRegistrado: Comentario) => {
        this.comentarios.push(comentarioRegistrado);  // Agregar comentario a la lista
        this.comentarioForm.reset({ description: '', anonimo: false, fecha: new Date() });  // Resetear formulario
      });
    }
  }

  // Método para eliminar un comentario
  eliminarComentario(id: number): void {
    this.comentarioService.eliminarComentario(id).subscribe(() => {
      this.comentarios = this.comentarios.filter(comentario => comentario.id !== id);  // Filtrar el comentario eliminado
    });
  }

  // Método para responder a un comentario (actualmente solo loguea el comentario respondido)
  responder(comentario: Comentario): void {
    console.log(`Respondiendo a ${comentario.id}`);
    // Aquí podrías implementar la lógica para responder a un comentario
  }
}
