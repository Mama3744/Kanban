import { Component, EventEmitter, input, Input, output, Output } from '@angular/core';
import { CardComponent } from "../card/card.component";
import { Column, DragDropPayload, Ticket } from '../../models/models';
import { DraggableDirective } from '../../directives/draggable.directive';
import { DroppableDirective } from '../../directives/droppable.directive';

@Component({
  selector: 'app-column',
  imports: [CardComponent, DraggableDirective, DroppableDirective],
  templateUrl: './column.component.html',
  styleUrl: './column.component.scss'
})
export class ColumnComponent {
  column = input.required<Column>() ;
  tickets = input.required<Ticket[]>();
  addTicket = output<void>();
  reorderTicket = output<DragDropPayload>();

}
