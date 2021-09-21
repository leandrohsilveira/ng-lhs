import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {UsuarioService} from '@app-modules/user'
import {UsuarioEditarComponent} from './usuario-editar'
import {UsuarioIncluirComponent} from './usuario-incluir'
import {UsuarioListarComponent} from './usuario-listar'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: UsuarioListarComponent,
  },
  {
    path: 'incluir',
    component: UsuarioIncluirComponent,
    data: {
      title: 'Cadastrar usuário',
      breadcrumb: 'Cadastrar',
    },
  },
  {
    path: 'editar/:id',
    component: UsuarioEditarComponent,
    data: {
      id: 'id',
      data: 'usuario',
      title: 'Editar usuário',
      breadcrumb: 'Editar',
    },
    resolve: {
      usuario: UsuarioService,
    },
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioRoutingModule {}
