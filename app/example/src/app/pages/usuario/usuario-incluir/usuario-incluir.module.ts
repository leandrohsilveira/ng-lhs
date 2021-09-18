import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {UsuarioIncluirComponent} from './usuario-incluir.component'
import {LibUsuarioModule} from '@app-modules/user'
import {ComponentsModule} from '@ngx-lhs/components'
import {RouterModule} from '@angular/router'

@NgModule({
  imports: [CommonModule, RouterModule, LibUsuarioModule, ComponentsModule],
  declarations: [UsuarioIncluirComponent],
  exports: [UsuarioIncluirComponent],
})
export class UsuarioIncluirModule {}
