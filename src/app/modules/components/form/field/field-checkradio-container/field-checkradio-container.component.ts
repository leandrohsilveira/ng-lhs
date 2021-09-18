import { Component, Input, Optional } from '@angular/core';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';
import { FormValidationErrorDisplay } from '../../form';
import { FormService } from '../../form.service';
import { FieldValidationErrorDisplay } from '../field';
import { FieldService } from '../field.service';
import { CheckRadioDirection } from './field-checkradio-container';

@Component({
  selector: 'app-field-checkradio-container',
  templateUrl: './field-checkradio-container.component.html',
  styleUrls: ['./field-checkradio-container.component.css']
})
export class FieldCheckradioContainerComponent {

  constructor(
    @Optional() private formService?: FormService,
    @Optional() private fieldService?: FieldService,
    @Optional() private controlContainer?: ControlContainer,
  ) {}

  @Input()
  direction?: CheckRadioDirection;

  private _name?: string;

  private _displayErrorOn?: FieldValidationErrorDisplay | FormValidationErrorDisplay;

  get displayErrorOn(): FieldValidationErrorDisplay | FormValidationErrorDisplay {
    return this._displayErrorOn ?? this.fieldService?.displayErrorsOn ?? this.formService?.displayErrorsOn ?? "dirty";
  }

  @Input()
  set displayErrorOn(displayErrorOn: FieldValidationErrorDisplay | FormValidationErrorDisplay) {
    this._displayErrorOn = displayErrorOn;
  }

  get name() {
    return this._name ?? this.fieldService?.name;
  }

  @Input()
  set name(name) {
    this._name = name;
  }

  get cssClass() {
    const direction = this.direction ?? "HORIZONTAL";
    const classes = [
      "field-checkradio-container", 
      `field-checkradio-container-direction-${direction.toLowerCase()}`,
      `field-checkradio-container-display-errors-on-${this.displayErrorOn}`
    ];
    if (this.invalid) {
      classes.push('field-checkradio-container-invalid');
    }
    if (this.dirty) {
      classes.push('field-checkradio-container-dirty');
    }
    if (this.touched) {
      classes.push('field-checkradio-container-touched');
    }
    return classes.join(' ');
  }

  get invalid() {
    return this.formControl?.invalid;
  }

  get dirty() {
    return this.formControl?.dirty;
  }

  get touched() {
    return this.formControl?.touched;
  }

  private get formControl() {
    return this.name ? this.formGroup?.get(this.name) as FormControl : undefined;
  }

  private get formGroup() {
    return this.controlContainer?.control as FormGroup;
  }

}