import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FieldSuggestionComponent} from './field-suggestion.component'
import {
  DefaultFieldSuggestionI18nService,
  FIELD_SUGGESTION_I18N_SERVICE,
} from './field-suggestion-i18n.service'

@NgModule({
  imports: [CommonModule],
  declarations: [FieldSuggestionComponent],
  exports: [FieldSuggestionComponent],
})
export class FieldSuggestionModule {}
