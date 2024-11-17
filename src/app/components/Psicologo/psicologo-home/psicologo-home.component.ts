import { Component, OnInit } from '@angular/core';
import { JwtHelperService, JWT_OPTIONS} from '@auth0/angular-jwt';
import { RouterModule } from '@angular/router';
import { MenuPsicologoComponent } from '../menu-psicologo/menu-psicologo.component';


@Component({
  selector: 'app-psicologo-home',
  standalone: true,
  imports: [RouterModule, MenuPsicologoComponent],
  templateUrl: './psicologo-home.component.html',
  styleUrl: './psicologo-home.component.css',
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ]
})
export class PsicologoHomeComponent implements OnInit{

  userName: string = '';

  constructor(private jwtHelper: JwtHelperService) {}

  ngOnInit(): void {
    this.setUserName();
  }

  setUserName(): void {
    const token = sessionStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      console.log('Token decodificado:', decodedToken);
      this.userName = decodedToken?.nombre || decodedToken?.sub || 'Usuario';
    }
  }
}
