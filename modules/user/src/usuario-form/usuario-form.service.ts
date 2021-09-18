import {Injectable} from '@angular/core'
import {tap} from 'rxjs/operators'
import {IUsuarioFormValue} from './usuario-form'
import {UsuarioService} from '../usuario.service'
import {IUsuarioVisualizar} from '../usuario'
import {throwError} from 'rxjs'

@Injectable()
export class UsuarioFormService {
  constructor(private service: UsuarioService) {}

  incluir(dados: IUsuarioFormValue) {
    return this.service
      .incluir({
        nome: dados.nome,
        genero: dados.genero,
        email: dados.email,
        username: dados.username,
        senha: dados.senha,
        termosDeUsoAceito: dados.termosDeUsoAceito ?? false,
        papeis: dados.papeis.map(({papel}) => papel.chave),
      })
      .pipe(tap(() => alert('Usuario cadastrado com sucesso')))
  }

  editar(dados: IUsuarioFormValue) {
    if (dados.id) {
      return this.service
        .editar({
          id: dados.id,
          nome: dados.nome,
          genero: dados.genero,
          email: dados.email,
          papeis: dados.papeis.map(({papel}) => papel.chave),
        })
        .pipe(tap(() => alert('Usuario atualizado com sucesso')))
    } else {
      return throwError(() => new Error('Should provide an ID to update it'))
    }
  }

  visualizar(dados: IUsuarioVisualizar): IUsuarioFormValue {
    return {
      id: dados.id,
      nome: dados.nome,
      genero: dados.genero,
      email: dados.email,
      username: dados.username,
      papeis: dados.papeis.map((papel) => ({
        busca: papel.descricao,
        papel,
      })),
      senha: '',
    }
  }
}
