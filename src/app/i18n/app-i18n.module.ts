import {NgModule} from '@angular/core'
import {CommonModule, DatePipe} from '@angular/common'
import {
  FIELD_I18N_SERVICE,
  FIELD_SUGGESTION_I18N_SERVICE,
} from '../modules/components'
import {AppFieldI18nService} from './app-field-i18n.service'
import {AppFieldSuggestionI18nService} from './app-field-suggestion-i18n.service'
import {DateOnlyPipe} from './date-only.pipe'

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: FIELD_I18N_SERVICE,
      useClass: AppFieldI18nService,
    },
    {
      provide: FIELD_SUGGESTION_I18N_SERVICE,
      useClass: AppFieldSuggestionI18nService,
    },
    DatePipe,
  ],
  declarations: [DateOnlyPipe],
  exports: [DateOnlyPipe],
})
export class AppI18nModule {}
