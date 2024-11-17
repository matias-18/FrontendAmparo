import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
@Component({
  selector: 'app-homepage',
  standalone: true,
  imports:[RouterModule, MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule, MatListModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  constructor(private router: Router) {}

  scrollToFragment(fragment: string) {
    this.router.navigate([], { fragment }).then(() => {
      const element = document.getElementById(fragment);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}
