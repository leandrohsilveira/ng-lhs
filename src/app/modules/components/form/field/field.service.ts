import {Injectable} from '@angular/core'
import {FormControl} from '@angular/forms'
import {Observable} from 'rxjs'
import {FieldValidationErrorDisplay, IFieldKeyEvent} from './field'

@Injectable()
export class FieldService {
  constructor() {}

  name: string

  valueControlName?: string

  displayErrorsOn: FieldValidationErrorDisplay = 'dirty'

  keydown$: Observable<IFieldKeyEvent>

  focus$: Observable<void>

  blur$: Observable<void>

  ngAfterViewInit$: Observable<HTMLInputElement[]>

  control: FormControl
}
