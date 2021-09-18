import {Injectable} from '@angular/core'
import {defer, Observable, of} from 'rxjs'
import {IPapelVisualizacao, PAPEIS} from './papel'

@Injectable()
export class PapelService {
  constructor() {}

  recuperarPorChave(chave: string): Observable<IPapelVisualizacao> {
    return defer(() => of(this.findByChave(chave)))
  }

  buscarPorChaves(chaves: string[]): Observable<IPapelVisualizacao[]> {
    return defer(() => of(chaves.map((chave) => this.findByChave(chave))))
  }

  buscarPorParteDescricao(descricao: string): Observable<IPapelVisualizacao[]> {
    return defer(() =>
      of(
        PAPEIS.filter(
          (papel) =>
            papel.descricao.toUpperCase().indexOf(descricao.toUpperCase()) >= 0
        )
      )
    )
  }

  private findByChave(chave: string): IPapelVisualizacao {
    const papel = PAPEIS.find((papel) => papel.chave === chave)
    if (papel) return papel
    else throw new Error(`Nenhum papel encontrado com chave "${chave}"`)
  }
}
