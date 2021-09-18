import {Injectable} from '@angular/core'
import uuid from 'simple-uuid'
import {map, mapTo, switchMap, Observable} from 'rxjs'
import {
  IUsuarioEditar,
  IUsuarioIncluir,
  IUsuarioListar,
  IUsuarioVisualizar,
  USUARIOS,
} from './usuario'
import {ListPage, Pageable, simulateAsync} from './utils'
import {PapelService} from './papel'
import {ActivatedRouteSnapshot, Resolve} from '@angular/router'

@Injectable()
export class UsuarioService implements Resolve<IUsuarioVisualizar> {
  constructor(private papelService: PapelService) {}

  incluir(dados: IUsuarioIncluir): Observable<void> {
    return simulateAsync().pipe(
      map(() =>
        USUARIOS.push({
          id: uuid(),
          nome: dados.nome,
          email: dados.email,
          papeis: dados.papeis,
          username: dados.username,
          senha: dados.senha,
          genero: dados.genero,
        })
      ),
      mapTo(undefined)
    )
  }

  editar(dados: IUsuarioEditar): Observable<void> {
    return simulateAsync().pipe(
      map(() => {
        const usuario = this.findById(dados.id)
        usuario.nome = dados.nome
        usuario.email = dados.email
        usuario.genero = dados.genero
        usuario.papeis = dados.papeis
      }),
      mapTo(undefined)
    )
  }

  recuperarPorId(id: string): Observable<IUsuarioVisualizar> {
    return simulateAsync().pipe(
      map(() => {
        const {nome, genero, email, papeis, username} = this.findById(id)
        return {
          id,
          nome,
          genero,
          email,
          username,
          papeis,
        }
      }),
      switchMap(({papeis: chaves, ...dados}) =>
        this.papelService
          .buscarPorChaves(chaves)
          .pipe(map((papeis) => ({...dados, papeis})))
      )
    )
  }

  listar(pageable: Pageable): Observable<ListPage<IUsuarioListar>> {
    return simulateAsync().pipe(
      map(() => ({
        items: pageable.slice(USUARIOS),
        count: USUARIOS.length,
      }))
    )
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.recuperarPorId(route.params[route.data.id ?? 'id'])
  }

  private findById(id: string) {
    const usuario = USUARIOS.find((usuario) => usuario.id === id)
    if (usuario) return usuario
    else throw new Error(`Usuário com ID ${id} não encontrado!`)
  }
}
