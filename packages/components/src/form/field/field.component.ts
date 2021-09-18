import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  ViewChild,
} from '@angular/core'
import {ControlContainer, FormControl, FormGroup} from '@angular/forms'
import {BehaviorSubject, Subject} from 'rxjs'
import {filter, map, startWith, takeUntil} from 'rxjs/operators'
import {
  FieldValidationErrorDisplay,
  ICustomFieldValidationError,
  IFieldKeyEvent,
} from './field'
import {FIELD_I18N_SERVICE, IFieldI18nService} from './field-i18n.service'
import {FieldService} from './field.service'

@Component({
  selector: 'lhs-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css'],
  providers: [FieldService],
})
export class FieldComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    private fieldService: FieldService,
    @Inject(FIELD_I18N_SERVICE) private i18nService: IFieldI18nService,
    @Optional() private controlContainer?: ControlContainer,
  ) {
    this.onFocus = this.onFocus.bind(this)
    this.onBlur = this.onBlur.bind(this)
  }

  @Input()
  name!: string

  @Input()
  valueControlName?: string

  @Input()
  label!: string

  @Input()
  displayErrorsOn: FieldValidationErrorDisplay = 'dirty'

  @ViewChild('ref')
  ref?: ElementRef<HTMLDivElement>

  requiredErrorMessage?: string
  emailErrorMessage?: string
  minLengthErrorMessage?: string
  maxLengthErrorMessage?: string
  minNumberErrorMessage?: string
  maxNumberErrorMessage?: string
  customValidationErrors: ICustomFieldValidationError[] = []

  private keydown$ = new Subject<IFieldKeyEvent>()

  private focus$ = new Subject<void>()

  private blur$ = new Subject<void>()

  private ngAfterViewInit$ = new BehaviorSubject<HTMLInputElement[] | undefined>(undefined)

  private ngOnDestroy$ = new Subject()

  get inputElements() {
    return this.ref?.nativeElement?.querySelectorAll('input')
  }

  get shouldDisplayError() {
    switch (this.displayErrorsOn) {
      case 'always':
        return true
      case 'touched':
        return this.touched
      case 'dirty':
      default:
        return this.dirty
    }
  }

  get fieldCssClass() {
    const classes = ['field', `field-display-errors-on-${this.displayErrorsOn}`]
    if (this.invalid) {
      classes.push('field-invalid')
    }
    if (this.dirty) {
      classes.push('field-dirty')
    }
    if (this.touched) {
      classes.push('field-touched')
    }
    return classes.join(' ')
  }

  get invalid() {
    return this.valueControl?.invalid || this.formControl?.invalid
  }

  get dirty() {
    return this.valueControl?.dirty || this.formControl?.dirty
  }

  get touched() {
    return this.valueControl?.touched || this.formControl?.touched
  }

  get errors() {
    return this.valueControl?.errors ?? this.formControl?.errors ?? {}
  }

  get isI18nServiceProvided() {
    return !!this.i18nService
  }

  private get formControl() {
    return this.name
      ? (this.formGroup?.get(this.name) as FormControl)
      : undefined
  }

  private get valueControl() {
    return this.valueControlName
      ? (this.formGroup?.get(this.valueControlName) as FormControl)
      : undefined
  }

  private get formGroup() {
    return this.controlContainer?.control as FormGroup
  }

  ngOnInit() {
    this.fieldService.name = this.name
    this.fieldService.valueControlName = this.valueControlName
    this.fieldService.displayErrorsOn = this.displayErrorsOn
    this.fieldService.control = this.formControl
    this.fieldService.keydown$ = this.keydown$.asObservable()
    this.fieldService.focus$ = this.focus$.asObservable()
    this.fieldService.blur$ = this.blur$.asObservable()
    this.fieldService.ngAfterViewInit$ = this.ngAfterViewInit$.pipe(
      filter((inputs) => inputs !== undefined),
      map(inputs => inputs as HTMLInputElement[])
    )
    const control = this.valueControl ?? this.formControl
    control?.statusChanges
      .pipe(
        startWith(control.status),
        takeUntil(this.ngOnDestroy$),
        filter((status) => status === 'VALID' || status === 'INVALID'),
        map(() => this.errors)
      )
      .subscribe(
        ({required, minlength, maxlength, min, max, email, ...custom}) => {
          if (required)
            this.requiredErrorMessage =
              this.i18nService.getRequiredErrorMessage(this.label)
          if (minlength)
            this.minLengthErrorMessage =
              this.i18nService.getMinLengthErrorMessage(this.label, minlength)
          if (maxlength)
            this.maxLengthErrorMessage =
              this.i18nService.getMaxLengthErrorMessage(this.label, maxlength)
          if (min)
            this.minNumberErrorMessage =
              this.i18nService.getMinNumberErrorMessage(this.label, min)
          if (max)
            this.maxNumberErrorMessage =
              this.i18nService.getMaxNumberErrorMessage(this.label, max)
          if (email)
            this.emailErrorMessage = this.i18nService.getEmailErrorMessage(
              this.label
            )

          this.customValidationErrors = Object.entries(custom)
            .map(([error, props]) => ({
              error,
              message: this.i18nService.getCustomErrorMessage(
                error,
                this.label,
                props
              ),
            }))
            .filter(({error, message}) => {
              if (message === null || message === undefined) {
                console.warn(
                  'No custom field validation error message found for error',
                  error
                )
                return false
              }
              return true
            })
        }
      )
  }

  ngAfterViewInit() {
    const inputElements = this.inputElements
    const elementsArray: HTMLInputElement[] = []
    inputElements?.forEach((input) => {
      input.addEventListener('focus', this.onFocus)
      input.addEventListener('blur', this.onBlur)
      elementsArray.push(input)
    })
    this.ngAfterViewInit$.next(elementsArray)
  }

  ngOnDestroy() {
    this.inputElements?.forEach((input) => {
      input.removeEventListener('focus', this.onFocus)
      input.removeEventListener('blur', this.onBlur)
    })
    this.keydown$.complete()
    this.focus$.complete()
    this.blur$.complete()
    this.ngOnDestroy$.next(undefined)
    this.ngOnDestroy$.complete()
    this.ngAfterViewInit$.complete()
  }

  onArrowDownKeydown(source: Event) {
    this.keydown$.next({
      source,
      type: 'down',
    })
  }

  onArrayUpKeydown(source: Event) {
    this.keydown$.next({
      source,
      type: 'up',
    })
  }

  onEnterKeydown(source: Event) {
    this.keydown$.next({
      source,
      type: 'enter',
    })
  }

  onFocus() {
    this.focus$.next()
  }

  onBlur() {
    this.blur$.next()
  }
}
