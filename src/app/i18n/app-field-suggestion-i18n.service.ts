import {IFieldSuggestionI18nService} from '../modules/components'

export class AppFieldSuggestionI18nService
  implements IFieldSuggestionI18nService
{
  getMinSearchLengthMessage(minLength: number): string {
    if (minLength === 1) {
      return 'Digite pelo menos um caracter para inicar a busca'
    }
    return `Digite pelo menos ${minLength} caracteres para iniciar a busca`
  }

  getNoSuggestionFoundMessage(): string {
    return 'Nenhum resultado encontrado para a busca'
  }
}
