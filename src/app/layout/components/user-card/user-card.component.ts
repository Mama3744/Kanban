import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user-card',
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  @Input()
  username: string = '';

  @Output()
  toggleAuth = new EventEmitter<void>();

  get isConnected() {
    return !!this.username;
  }
}

