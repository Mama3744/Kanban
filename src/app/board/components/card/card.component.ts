import { Component, input, Input } from '@angular/core';
import { Ticket } from '../../models/models';
import { TitleLimiterPipe } from '../../pipes/title-limiter.pipe';

@Component({
  selector: 'app-card',
  imports: [TitleLimiterPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  ticket = input.required<Ticket>();
}
