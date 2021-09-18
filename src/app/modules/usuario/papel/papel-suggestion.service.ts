import {Injectable} from '@angular/core'
import {PapelService} from '.'
import {ISuggestionService} from '../../components'
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
