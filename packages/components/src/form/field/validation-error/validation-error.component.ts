import {Component, Input, Optional} from '@angular/core'
import {
  ControlContainer,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms'
import {FormValidationErrorDisplay} from '../../form'
import {FormService} from '../../form.service'
import {FieldValidationErrorDisplay} from '../field'
import {FieldService} from '../field.service'

@Component({
  selector: 'lhs-validation-error',
  templateUrl: './validation-error.component.html',
  styleUrls: ['./validation-error.component.css'],
})
export class ValidationErrorComponent {
  constructor(
    @Optional() private controlContainer?: ControlContainer,
    @Optional() private formService?: FormService,
    @Optional() private fieldService?: FieldService
  ) {}

  @Input()
  error?: string

  private _name?: string

  private _displayErrorOn?:
    | FieldValidationErrorDisplay
    | FormValidationErrorDisplay

  get name() {
    return this._name ?? this.fieldService?.name
  }

  @Input()
  set name(name) {
    this._name = name
  }

  get displayErrorOn():
    | FieldValidationErrorDisplay
    | FormValidationErrorDisplay {
    return (
      this._displayErrorOn ??
      this.fieldService?.displayErrorsOn ??
      this.formService?.displayErrorsOn ??
      'dirty'
    )
  }

  @Input()
  set displayErrorOn(
    displayErrorOn: FieldValidationErrorDisplay | FormValidationErrorDisplay
  ) {
    this._displayErrorOn = displayErrorOn
  }

  get shouldDisplayError() {
    switch (this.displayErrorOn) {
      case 'always':
        return true
      case 'touched':
        return this.control.touched
      case 'dirty':
      default:
        return this.control.dirty
    }
  }

  get hasError() {
    return this.errors && this.error && !!this.errors[this.error]
  }

  get controlType() {
    if (this.control instanceof FormGroup) {
      return 'FormGroup'
    }
    if (this.control instanceof FormArray) {
      return 'FormArray'
    }
    if (this.control instanceof FormControl) {
      return 'FormControl'
    }
    return undefined;
  }

  private get errors() {
    return this.valueControl?.errors ?? this.control?.errors
  }

  private get valueControl() {
    return this.fieldService?.valueControlName
      ? (this.formGroup?.get(this.fieldService.valueControlName) as FormControl)
      : undefined
  }

  private get control() {
    return this.name
      ? (this.formGroup?.get(this.name) as FormControl)
      : this.formGroup
  }

  private get formGroup() {
    return this.controlContainer?.control as FormGroup
  }
}
