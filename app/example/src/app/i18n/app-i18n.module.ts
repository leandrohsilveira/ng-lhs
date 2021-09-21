import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {
  FIELD_I18N_SERVICE,
  FIELD_SUGGESTION_I18N_SERVICE,
} from '@ngx-lhs/components'
import {AppFieldI18nService} from './app-field-i18n.service'
import {AppFieldSuggestionI18nService} from './app-field-suggestion-i18n.service'

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
  ],
  declarations: [],
  exports: [],
})
export class AppI18nModule {}
