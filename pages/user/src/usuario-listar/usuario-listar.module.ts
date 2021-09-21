import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {UsuarioListarComponent} from './usuario-listar.component'
import {
  BreadcrumbModule,
  ButtonModule,
  PageTitleModule,
  ListPaginatorModule,
} from '@ngx-lhs/components'
import {UsuarioListModule} from '@app-modules/user'

@NgModule({
  declarations: [UsuarioListarComponent],
  imports: [
    CommonModule,
    ButtonModule,
    UsuarioListModule,
    ListPaginatorModule,
    BreadcrumbModule,
    PageTitleModule,
  ],
  exports: [UsuarioListarComponent],
})
export class UsuarioListarModule {}