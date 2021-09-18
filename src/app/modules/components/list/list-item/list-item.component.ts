import {Component, ContentChild, Input, TemplateRef} from '@angular/core'

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css'],
})
export class ListItemComponent {
  @Input()
  title?: unknown

  @Input()
  description?: unknown

  @ContentChild(TemplateRef)
  child: TemplateRef<any>
}
