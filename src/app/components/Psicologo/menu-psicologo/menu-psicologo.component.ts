import { RouterModule } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-psicologo',
  standalone: true,
  imports: [RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule],
  templateUrl: './menu-psicologo.component.html',
  styleUrl: './menu-psicologo.component.css'
})
export class MenuPsicologoComponent {

}
