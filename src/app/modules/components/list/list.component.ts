import { Component, ContentChild, Input, OnInit, TemplateRef, TrackByFunction } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent<T = unknown> implements OnInit {

  constructor() {}

  @Input()
  items: T[];

  @Input()
  titleField?: keyof T;

  @Input()
  descriptionField?: keyof T;

  @Input()
  trackByField?: keyof T;

  @Input()
  trackBy: TrackByFunction<T> = (index, item) => this.trackByField ? item[this.trackByField] : index;

  @ContentChild(TemplateRef)
  child: TemplateRef<any>;

  ngOnInit(): void {
  }

}
