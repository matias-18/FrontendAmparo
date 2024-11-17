import { Component, OnInit } from '@angular/core';
import { JwtHelperService, JWT_OPTIONS} from '@auth0/angular-jwt';
import { RouterModule } from '@angular/router';
import { MenuAbogComponent } from '../menu-abog/menu-abog.component';

@Component({
  selector: 'app-abogado-home',
  standalone: true,
  imports: [RouterModule, MenuAbogComponent],
  templateUrl: './abogado-home.component.html',
  styleUrl: './abogado-home.component.css',
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ]
})
export class AbogadoHomeComponent implements OnInit{
  
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
