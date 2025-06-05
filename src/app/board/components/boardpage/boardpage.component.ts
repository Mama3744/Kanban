import { Component, computed, signal } from '@angular/core';
import { ColumnComponent } from "../column/column.component";
import { allBoard, getData } from '../../models/data';
import { Column, DragDropLocation, DragDropPayload, Ticket } from '../../models/models';

@Component({
  selector: 'app-boardpage',
  imports: [ColumnComponent],
  templateUrl: './boardpage.component.html',
  styleUrl: './boardpage.component.scss'
})
export class BoardPageComponent {

  private ticketList = signal<Ticket[]>([]);

  columns = signal<Column[]>([]);
  ticketsByColumnId = computed(() => {
    const columns = this.columns();
    const tickets = this.ticketList();
    return this.getTicketsMap(columns, tickets);
  });
  isLoadingBoard = signal<boolean>(false);
  hasError = signal<boolean>(false);

  constructor() {
    this.isLoadingBoard.set(true);
    this.hasError.set(false);
    getData()
      .finally(() => this.isLoadingBoard.set(false))
      .then(({ columns, tickets }) => {
        this.columns.set(columns); 
        this.ticketList.set(tickets);
      }, (err) => this.hasError.set(true));
  }

  addTicket(columnId: string) {
    console.log(`add new ticket to column ${columnId} !`);
  }

  onReorderTicket([from, to]: [DragDropLocation, DragDropLocation]) {
    function shift(arr: Ticket[], isUp: boolean, fromId: number = 0, toId: number = arr.length) {
      for (let ticket of arr) {
        if (ticket.order >= fromId && ticket.order <= toId) {
          ticket.order += isUp ? 1 : -1;
        }
      }
    }

  const ticketsMap = this.ticketsByColumnId();
  const ticketList = this.ticketList();

  const fromTicket = ticketsMap[from.columnId].find((t) => t.id === from.ticketId);
  const toTicket = ticketsMap[to.columnId].find((t) => t.id === to.ticketId);
  const newOrder = toTicket?.order || 1;
  
  if (!fromTicket) return;
  if (from.columnId !== to.columnId) {
    shift(ticketsMap[from.columnId], false, fromTicket.order);
    shift(ticketsMap[to.columnId], true, newOrder);
  } else {
    const isGoingUp = fromTicket.order > newOrder;
    shift(
      ticketsMap[to.columnId],
      isGoingUp,
      Math.min(fromTicket.order, newOrder),
      Math.max(fromTicket.order, newOrder),
    );
  }

    fromTicket.order = newOrder;
    fromTicket.columnId = to.columnId;

    this.ticketList.set([...ticketList]);
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
    
    return draftMap;
  }

  
}

