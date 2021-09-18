import {Component, OnInit} from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router'
import {map, Observable, switchMap} from 'rxjs'
import {ListRouterService} from '@ngx-lhs/components'
import {IUsuarioListar, UsuarioService} from 'src/app/modules/usuario'
import {Pageable} from 'src/app/modules/usuario/utils'

@Component({
  templateUrl: './usuario-listar.component.html',
})
export class UsuarioListarComponent implements OnInit {
  constructor(
    public listRouter: ListRouterService,
    private usuarioService: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  users$: Observable<IUsuarioListar[]>

  ngOnInit(): void {
    this.users$ = this.listRouter.input$.pipe(
      switchMap(({page, size}) =>
        this.usuarioService.listar(Pageable.ofPage(page, size))
      ),
      map(({items, count}) => {
        this.listRouter.count = count
        return items
      })
    )
  }

  onAdicionarUsuarioClick() {
    this.router.navigate(['incluir'], {relativeTo: this.activatedRoute})
  }

  onEditarUsuarioClick(usuario: IUsuarioListar) {
    this.router.navigate(['editar', usuario.id], {
      relativeTo: this.activatedRoute,
    })
  }
}
