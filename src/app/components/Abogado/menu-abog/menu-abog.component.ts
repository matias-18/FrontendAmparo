import { RouterModule } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-abog',
  standalone: true,
  imports: [RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule],
  templateUrl: './menu-abog.component.html',
  styleUrl: './menu-abog.component.css'
})
export class MenuAbogComponent {

}
