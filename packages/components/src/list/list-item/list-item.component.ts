import {Component, Input} from '@angular/core'

@Component({
  selector: 'lhs-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css'],
})
export class ListItemComponent {
  @Input()
  title?: unknown

  @Input()
  description?: unknown

}
