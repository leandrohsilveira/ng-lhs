import {Injectable} from '@angular/core'
import {ISuggestionService} from '@ngx-lhs/components'
import {PapelService} from './papel.service'
import {IPapelVisualizacao} from './papel'

@Injectable()
export class PapelSuggestionService
  implements ISuggestionService<IPapelVisualizacao>
{
  constructor(private papelService: PapelService) {}

  getLabel(obj: IPapelVisualizacao): string {
    return obj.descricao
  }

  suggest(value: string) {
    return this.papelService.buscarPorParteDescricao(value)
  }
}
