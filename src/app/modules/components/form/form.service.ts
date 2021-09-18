import { Injectable } from '@angular/core';
import { FormValidationErrorDisplay } from './form';

@Injectable()
export class FormService {

  constructor() {}

  displayErrorsOn: FormValidationErrorDisplay = 'dirty';

}