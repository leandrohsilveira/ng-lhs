import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {UsuarioIncluirComponent} from './usuario-incluir.component'
import {LibUsuarioModule} from '../../../modules/usuario'
import {ComponentsModule} from '../../../modules/components'
import {RouterModule} from '@angular/router'

@NgModule({
  imports: [CommonModule, RouterModule, LibUsuarioModule, ComponentsModule],
  declarations: [UsuarioIncluirComponent],
  exports: [UsuarioIncluirComponent],
})
export class UsuarioIncluirModule {}
