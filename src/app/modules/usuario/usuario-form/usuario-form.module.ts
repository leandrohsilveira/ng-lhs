import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ReactiveFormsModule} from '@angular/forms'
import {UsuarioFormComponent} from './usuario-form.component'
import {ComponentsModule} from '../../components'

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, ComponentsModule],
  declarations: [UsuarioFormComponent],
  exports: [UsuarioFormComponent],
})
export class UsuarioFormModule {}
