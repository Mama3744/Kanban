import { Component } from '@angular/core';
import { ColumnComponent } from "../column/column.component";
import { allBoard } from '../../models/data';
import { Column, Ticket } from '../../models/models';

@Component({
  selector: 'app-boardpage',
  imports: [ColumnComponent],
  templateUrl: './boardpage.component.html',
  styleUrl: './boardpage.component.scss'
})
export class BoardPageComponent {
  columns = allBoard.columns;
  ticketsByColumnId: Record<string, Ticket[]> = {};

  constructor() {
    this.ticketsByColumnId = this.getTicketsMap(
      allBoard.columns,
      allBoard.tickets
    );
  }

  addTicket(columnId: string) {
    console.log(`add new ticket to column ${columnId} !`);
  }

  private getTicketsMap(columns: Column[], tickets: Ticket[]) {
    const draftMap: Record<string, Ticket[]> = {};

    for (let ticket of tickets) {
      if(!draftMap[ticket.columnId]) {
        draftMap[ticket.columnId] = [];
      }
      const columnId = ticket.columnId;
      draftMap[columnId].push(ticket);
    }

    for (let{ id } of columns) {
      const currentColumn = draftMap[id];
      if (!currentColumn) {
        draftMap[id] = [];
      } else currentColumn.sort((a, b) => a.order - b.order);
    }
    console.log(draftMap);
    
    return draftMap;
  }
}

