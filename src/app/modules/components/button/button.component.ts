import {Component, EventEmitter, Input, Output} from '@angular/core'
import {ButtonStyle, ButtonColor} from './button'

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input()
  color: ButtonColor = 'default'

  @Input()
  kind: ButtonStyle = 'button'

  @Input()
  type: 'button' | 'submit' = 'button'

  @Input()
  disabled = false

  @Output()
  click = new EventEmitter()

  get cssClass() {
    return `${this.kind} ${this.color}`
  }
}
