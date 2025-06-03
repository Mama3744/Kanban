import { Component } from '@angular/core';
import { NavMenuComponent } from '../nav-menu/nav-menu.component';
import { UserCardComponent } from '../user-card/user-card.component';

@Component({
  selector: 'app-header',
  imports: [NavMenuComponent, UserCardComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isUserAdmin = false;
  onToggleAuth() {}
}

