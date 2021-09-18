import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UsuarioFormModule } from "./usuario-form";
import { UsuarioService } from "./usuario.service";
import { PapelService } from "./papel";

@NgModule({
  providers: [PapelService, UsuarioService],
  imports: [CommonModule, UsuarioFormModule],
  exports: [UsuarioFormModule]
})
export class LibUsuarioModule {}
