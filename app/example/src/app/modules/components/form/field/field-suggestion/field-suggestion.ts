import {Observable, of} from 'rxjs'

export interface ISuggestionService<T> {
  getLabel(obj: T): string

  suggest(value: string): Observable<T[]>
}

export abstract class LocalSuggestionService<T>
  implements ISuggestionService<T>
{
  resultsLimit = 5

  abstract data: T[]

  abstract getLabel(obj: T): string

  suggest(value: string): Observable<T[]> {
    return of(
      this.data
        .filter(
          (obj) =>
            this.getLabel(obj).toUpperCase().indexOf(value.toUpperCase()) >= 0
        )
        .slice(0, this.resultsLimit)
    )
  }
}
