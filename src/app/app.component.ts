import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <ul class="nav-bar">
    <li><a routerLink="/countries">Countries list</a></li>
  </ul>
  <div class="container">
    <router-outlet></router-outlet>
  </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend-home-assignment';
}
