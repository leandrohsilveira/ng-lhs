import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {UsuarioListComponent} from './usuario-list.component'
import {ButtonModule, ListModule} from '../../components'

@NgModule({
  declarations: [UsuarioListComponent],
  imports: [CommonModule, ListModule, ButtonModule],
  exports: [UsuarioListComponent],
})
export class UsuarioListModule {}
