import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {UsuarioListarComponent} from './usuario-listar.component'
import {
  BreadcrumbModule,
  ButtonModule,
  PageTitleModule,
  ListPaginatorModule,
} from 'src/app/modules/components'
import {UsuarioListModule} from 'src/app/modules/usuario'

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
