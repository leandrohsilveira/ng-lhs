import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {UsuarioFormModule, UsuarioFormService} from './usuario-form'
import {UsuarioService} from './usuario.service'
import {PapelService, PapelSuggestionService} from './papel'

@NgModule({
  providers: [
    PapelService,
    UsuarioService,
    UsuarioFormService,
    PapelSuggestionService,
  ],
  imports: [CommonModule, UsuarioFormModule],
  exports: [UsuarioFormModule],
})
export class LibUsuarioModule {}
