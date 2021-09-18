import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {UsuarioRoutingModule} from './usuario-routing.module'
import {LibUsuarioModule} from '@app-modules/user'
import {UsuarioIncluirModule} from './usuario-incluir'
import {UsuarioEditarModule} from './usuario-editar'
import {UsuarioListarModule} from './usuario-listar'

@NgModule({
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    LibUsuarioModule,
    UsuarioIncluirModule,
    UsuarioEditarModule,
    UsuarioListarModule,
  ],
})
export class UsuarioModule {}
