import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comentario } from '../../../model/Comentario';
import { ComentarioService } from '../../../service/Comentario.service';
import { Users } from '../../../model/Users';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-foro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MenuComponent],
  templateUrl: './foro.component.html',
  styleUrls: ['./foro.component.css']
})
export class ForoComponent implements OnInit {
  comentarioForm: FormGroup;
  comentarios: Comentario[] = [];

  constructor(private fb: FormBuilder, private comentarioService: ComentarioService) {
    this.comentarioForm = this.fb.group({
      description: ['', Validators.required],
      fecha: [{ value: new Date(), disabled: true }],
      anonimo: [false]
    });
  }

  ngOnInit(): void {
    this.obtenerComentarios(); 
  }

  obtenerComentarios(): void {
    this.comentarioService.listarComentarios().subscribe((comentarios: Comentario[]) => {
      this.comentarios = comentarios;
    });
  }

  
  usuario: Users = {
    id: 1,
    username: '',
    password: '',
    enabled: true,
    name: '',
    surnames: '',
    email: '',
    role: { id: 1, rol: 'VICTIMA' }
  };

 
  enviarComentario(): void {
    if (this.comentarioForm.valid) {
      const nuevoComentario: Comentario = this.comentarioForm.getRawValue();
      nuevoComentario.usuario = this.usuario; 

      this.comentarioService.registrarComentario(nuevoComentario).subscribe(() => {
        this.obtenerComentarios(); 
        this.comentarioForm.reset({ description: '', fecha: new Date(), anonimo: false }); 
      });
    }
  }

  eliminarComentario(id: number): void {
    this.comentarioService.eliminarComentario(id).subscribe(() => {
      this.comentarios = this.comentarios.filter(comentario => comentario.id !== id);
    });
  }
}
