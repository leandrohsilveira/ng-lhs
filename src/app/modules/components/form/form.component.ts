import {Component, Input, OnInit, Optional} from '@angular/core'
import {ControlContainer, FormGroup} from '@angular/forms'
import {FormValidationErrorDisplay} from './form'
import {FormService} from './form.service'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [FormService],
})
export class FormComponent implements OnInit {
  constructor(
    private formService: FormService,
    @Optional() private controlContainer?: ControlContainer
  ) {}

  @Input()
  displayErrorsOn: FormValidationErrorDisplay = 'dirty'

  get formCssClass() {
    const classes = ['form', `form-display-errors-on-${this.displayErrorsOn}`]
    if (this.formGroup?.invalid) {
      classes.push('form-invalid')
    }
    if (this.formGroup?.dirty) {
      classes.push('form-dirty')
    }
    if (this.formGroup?.touched) {
      classes.push('form-touched')
    }
    return classes.join(' ')
  }

  private get formGroup() {
    return this.controlContainer?.control as FormGroup
  }

  ngOnInit() {
    this.formService.displayErrorsOn = this.displayErrorsOn
  }
}
