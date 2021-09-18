import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-list-paginator',
  templateUrl: './list-paginator.component.html',
  styleUrls: ['./list-paginator.component.css'],
})
export class ListPaginatorComponent {

  constructor() {}

  @Input()
  page = 1;

  @Input()
  size = 10;

  @Input()
  maxPages: number;

  @Output()
  pageChange = new EventEmitter<number>();

  @Output()
  sizeChange = new EventEmitter<number>();

  get hasNextPage() {
    return typeof this.maxPages === 'number' && this.maxPages > this.page;
  }

  get hasPreviousPage() {
    return this.page > 1;
  }

  toPage(page: number) {
    this.pageChange.emit(page);
  }

  nextPage() {
    if (this.hasNextPage) {
      this.toPage(this.page + 1);
    }
  }

  previousPage() {
    if (this.hasPreviousPage) {
      this.toPage(this.page - 1)
    }
  }

}
