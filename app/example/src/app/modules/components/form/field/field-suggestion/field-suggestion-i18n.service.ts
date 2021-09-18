import {InjectionToken} from '@angular/core'

export const FIELD_SUGGESTION_I18N_SERVICE = new InjectionToken(
  'FIELD_SUGGESTION_I18N_SERVICE'
)

export interface IFieldSuggestionI18nService {
  getMinSearchLengthMessage(minLength: number): string

  getNoSuggestionFoundMessage(): string
}

export class DefaultFieldSuggestionI18nService
  implements IFieldSuggestionI18nService
{
  getMinSearchLengthMessage(minLength: number): string {
    return `Type at least ${minLength} character(s) to search`
  }

  getNoSuggestionFoundMessage(): string {
    return 'No suggestion found for search input'
  }
}
