import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardComponent } from "../card/card.component";
import { Column, Ticket } from '../../models/models';
import { DraggableDirective } from '../../directives/draggable.directive';
import { DroppableDirective } from '../../directives/droppable.directive';

@Component({
  selector: 'app-column',
  imports: [CardComponent, DraggableDirective, DroppableDirective],
  templateUrl: './column.component.html',
  styleUrl: './column.component.scss'
})
export class ColumnComponent {
  @Input({ required: true }) column!: Column;
  @Input({ required: true }) tickets!: Ticket[];
  @Output() addTicket = new EventEmitter<void>();

//Rajouter un if dans le html afin d'enlever le ticket numéro 2 de la colonne 1.

//Rajouter un if dans le html afin d'afficher les card de la colonne 3
//que si la liste des tickets de cette colonne ne depasse pas 2
//(rajoute un ticket sur cette colonne 3)

}
