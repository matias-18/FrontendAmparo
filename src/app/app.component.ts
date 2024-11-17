import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './components/Victima/menu/menu.component';
import { HomepageComponent } from './components/home/homepage/homepage.component';
import { MenuPsicologoComponent } from "./components/Psicologo/menu-psicologo/menu-psicologo.component";
import { LoginService } from './service/Login.service';
import { IniciarSesionComponent } from './components/Victima/iniciar-sesion/iniciar-sesion.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { NgIf } from '@angular/common';
import { MenuAbogComponent } from './components/Abogado/menu-abog/menu-abog.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, HomepageComponent, MenuPsicologoComponent, IniciarSesionComponent,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule, NgIf,
    MenuAbogComponent
    
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AMPAROTF';
  role: string = '';
  constructor(private loginService: LoginService) {}
  cerrar() {
    sessionStorage.clear();
  }

  verificar() {
    this.role = this.loginService.showRole();
    return this.loginService.verificar();
  }
  isAdministrador() {
    return this.role === 'ADMINISTRADOR';
  }

  isVictima() {
    return this.role === 'VICTIMA';
  }

  isAbogado() {
    return this.role === 'ABOGADO';
  }
  isPsicologo() {
    return this.role === 'PSICOLOGO';
  }
}
