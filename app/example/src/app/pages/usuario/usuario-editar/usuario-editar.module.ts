import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {UsuarioEditarComponent} from './usuario-editar.component'
import {LibUsuarioModule} from '../../../modules/usuario'
import {ComponentsModule} from '@ngx-lhs/components'
import {RouterModule} from '@angular/router'

@NgModule({
  imports: [CommonModule, RouterModule, LibUsuarioModule, ComponentsModule],
  declarations: [UsuarioEditarComponent],
  exports: [UsuarioEditarComponent],
})
export class UsuarioEditarModule {}
