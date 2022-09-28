import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  template: `
  <mat-paginator [length]="200" [pageSize]="itemsPerPage" [pageSizeOptions]="pageSizeOptions"
    (page)="handlePageEvent($event)" aria-label="Select page">
  </mat-paginator>
  `
})
export class PaginatorComponent {

  constructor() { }

  pageSizeOptions: number[] = [10, 25, 50, 100];
  pageIndex: number = 0;
  itemsPerPage = 25;
  pageSize?: number;

  @Output() range = new EventEmitter<number[]>();

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageIndex;
    this.itemsPerPage = event.pageSize;
    this.range.emit([event.pageIndex*event.pageSize, (event.pageIndex+1)*event.pageSize]);
  }

}
