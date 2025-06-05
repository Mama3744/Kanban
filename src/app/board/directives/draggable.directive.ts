import { Directive, ElementRef, HostBinding, HostListener, input, Input } from '@angular/core';
import { REORDER_DROP_DATATYPE } from '../models/constants';

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective {

  private dragEnterCount = 0;
  @HostBinding('class.dragging') isDragging = false;
  @HostBinding('class.drag-entered') hasDragEntered = false;
  
  constructor(el: ElementRef) {
    el.nativeElement.draggable = true;
  }

  appDraggableData = input.required<{id: string; columnId: string;}>();

  @HostListener('dragstart', ['$event'])
  onDragStart(event: DragEvent) {
    // console.log('drag');
    if (event.dataTransfer) {
        event.dataTransfer.setData(REORDER_DROP_DATATYPE, JSON.stringify(this.appDraggableData));
      }
  } 

  @HostListener('dragenter', ['$event'])
  onDragEnter(event: DragEvent) {
    this.dragEnterCount++;
    this.hasDragEntered = true;
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    this.dragEnterCount--;
    if(this.dragEnterCount === 0) {
      this.hasDragEntered = false;
    }
  }

  reset() {
    this.dragEnterCount = 0;
    this.hasDragEntered = false;
    this.isDragging = false;
  }

}
