import {
  Component,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
} from '@angular/core'
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms'
import {Subject} from 'rxjs'
import {
  debounceTime,
  delay,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators'
import {IFieldKeyEvent} from '../field'
import {FieldService} from '../field.service'
import {ISuggestionService} from './field-suggestion'
import {
  DefaultFieldSuggestionI18nService,
  FIELD_SUGGESTION_I18N_SERVICE,
  IFieldSuggestionI18nService,
} from './field-suggestion-i18n.service'

export interface ISuggestionItem {
  label: string
  value: any
}

@Component({
  selector: 'lhs-field-suggestion',
  templateUrl: './field-suggestion.component.html',
  styleUrls: ['./field-suggestion.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FieldSuggestionComponent),
      multi: true,
    },
  ],
})
export class FieldSuggestionComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  constructor(
    private fieldService: FieldService,
    @Optional()
    @Inject(FIELD_SUGGESTION_I18N_SERVICE)
    private i18nService: IFieldSuggestionI18nService = new DefaultFieldSuggestionI18nService()
  ) {}

  @Input()
  service!: ISuggestionService<any>

  @Input()
  minSearchLength = 3

  @Input()
  debounceTime = 400

  @Input()
  minSearchLengthText!: string

  @Input()
  noSuggestionsFoundText!: string

  @Output()
  openChange = new EventEmitter<boolean>()

  @Output()
  selectedSuggestionChange = new EventEmitter<any>()

  @Output()
  blur = new EventEmitter()

  cursorSuggestionIndex = 0

  suggestions?: ISuggestionItem[]

  private ngOnDestroy$ = new Subject()

  private _open = false

  private _selectedSuggestion?: any

  get open() {
    return this._open
  }

  @Input()
  set open(open) {
    if (open !== this._open) {
      this._open = open
      this.openChange.emit(open)
    }
  }

  get selectedSuggestion() {
    return this._selectedSuggestion
  }

  @Input()
  set selectedSuggestion(selectedSuggestion) {
    if (this._selectedSuggestion !== selectedSuggestion) {
      this._selectedSuggestion = selectedSuggestion
      this.selectedSuggestionChange.emit(selectedSuggestion)
      if (selectedSuggestion)
        this.fieldService?.control?.setValue(
          this.getSuggestionLabel(selectedSuggestion)
        )
    }
  }

  get suggestionsLength() {
    return this.suggestions?.length ?? 0
  }

  get searchTextLength() {
    return this.fieldService?.control?.value?.length ?? 0
  }

  get hasMinSearchLength() {
    return this.searchTextLength >= this.minSearchLength
  }

  ngOnInit() {
    if (!this.minSearchLengthText) {
      this.minSearchLengthText = this.i18nService.getMinSearchLengthMessage(
        this.minSearchLength
      )
    }
    if (!this.noSuggestionsFoundText) {
      this.noSuggestionsFoundText =
        this.i18nService.getNoSuggestionFoundMessage()
    }
    this.fieldService.keydown$.subscribe((e) => this.handleKeydown(e))
    this.fieldService.focus$.subscribe(() => this.handleFocus())
    this.fieldService.blur$.pipe(delay(100)).subscribe(() => this.handleBlur())
    this.fieldService.ngAfterViewInit$.subscribe({
      next: (inputs) => inputs.forEach((input) => (input.autocomplete = 'off')),
    })
    this.fieldService?.control?.valueChanges
      .pipe(
        filter(
          (value) => value !== this.getSuggestionLabel(this.selectedSuggestion)
        ),
        tap(() => {
          this.open = true
          this.selectedSuggestion = null
        }),
        filter((value) => value?.length >= this.minSearchLength),
        debounceTime(this.debounceTime),
        distinctUntilChanged(),
        takeUntil(this.ngOnDestroy$),
        switchMap((value) => this.service.suggest(value)),
        map((values) =>
          values.map((value) => ({
            value,
            label: this.service.getLabel(value),
          }))
        ),
        takeUntil(this.ngOnDestroy$)
      )
      .subscribe((suggestions) => (this.suggestions = suggestions))
  }

  ngOnDestroy() {
    this.ngOnDestroy$.next(undefined)
    this.ngOnDestroy$.complete()
  }

  writeValue(value: any) {
    this._selectedSuggestion = value
  }

  registerOnChange(next: any) {
    this.selectedSuggestionChange
      .pipe(takeUntil(this.ngOnDestroy$))
      .subscribe({next})
  }

  registerOnTouched(next: any) {
    this.blur.pipe(takeUntil(this.ngOnDestroy$)).subscribe({next})
  }

  setDisabledState(isDisabled: boolean) {
    if (isDisabled) {
      this.fieldService?.control?.disable()
    } else {
      this.fieldService?.control?.enable()
    }
  }

  onClick(index: number) {
    if (this.open && this.suggestions) {
      this.cursorSuggestionIndex = index
      this.open = false
      this.selectedSuggestion =
        this.suggestions[this.cursorSuggestionIndex].value
    }
  }

  private getSuggestionLabel(suggestion: any) {
    return suggestion && this.service.getLabel(suggestion)
  }

  private handleKeydown(e: IFieldKeyEvent) {
    switch (e.type) {
      case 'up':
        this.handleUp(e.source)
        break
      case 'down':
        this.handleDown(e.source)
        break
      case 'enter':
        this.handleEnter(e.source)
        break
      default:
        console.debug(`FieldSuggestionComponent: Unknown keydown event "${e}"`)
        break
    }
  }

  private handleUp(e: Event) {
    if (this.cursorSuggestionIndex > 0) {
      e.preventDefault()
      this.cursorSuggestionIndex--
    }
  }

  private handleDown(e: Event) {
    if (this.cursorSuggestionIndex < this.suggestionsLength - 1) {
      e.preventDefault()
      this.cursorSuggestionIndex++
    }
  }

  private handleEnter(e: Event) {
    if (this.open && this.suggestions && this.suggestionsLength > 0) {
      e.preventDefault()
      this.open = false
      this.selectedSuggestion =
        this.suggestions[this.cursorSuggestionIndex]?.value
    }
  }

  private handleFocus() {
    if (!this.selectedSuggestion) {
      this.open = true
    }
  }

  private handleBlur() {
    this.open = false
    if (!this.selectedSuggestion) {
      this.fieldService?.control?.setValue(undefined, {emitEvent: false})
    }
    this.blur.emit()
  }
}
