import { Component, OnInit } from '@angular/core';
import { JwtHelperService, JWT_OPTIONS} from '@auth0/angular-jwt';
import { UsersService } from '../../../../service/Users.service';
import { RouterModule } from '@angular/router';
import { MenuComponent } from '../../menu/menu.component';

@Component({
  selector: 'app-victima-feliz-home',
  standalone: true,
  imports: [RouterModule, MenuComponent],
  templateUrl: './victima-feliz-home.component.html',
  styleUrl: './victima-feliz-home.component.css',
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ]
})
export class VictimaFelizHomeComponent  implements OnInit{
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
