import { Component } from '@angular/core';
import { HeaderComponent } from './layout/components/header/header.component';
import { BoardPageComponent } from './board/components/boardpage/boardpage.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, BoardPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'kanban';
}
