import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { UsuarioFormComponent } from "./usuario-form.component";
import { UsuarioFormService } from "./usuario-form.service";
import { ComponentsModule } from "../../components";
import { UsuarioService } from "../usuario.service";
import { PapelSuggestionService, PapelService } from "../papel";

@NgModule({
  providers: [PapelService, UsuarioService, UsuarioFormService, PapelSuggestionService],
  imports: [CommonModule, ReactiveFormsModule, ComponentsModule],
  declarations: [UsuarioFormComponent],
  exports: [UsuarioFormComponent]
})
export class UsuarioFormModule {}
