import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  IUsuarioFormValue,
  UsuarioFormService
} from "../../../modules/usuario";

@Component({
  templateUrl: "./usuario-incluir.component.html"
})
export class UsuarioIncluirComponent {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formService: UsuarioFormService
  ) {}

  valido = false;

  dados: IUsuarioFormValue;

  onCadastrarClick() {
    this.formService
      .incluir(this.dados)
      .subscribe({ next: this.onSucessoCadastro.bind(this) });
  }

  onCancelarClick() {
    this.voltar();
  }

  onSucessoCadastro() {
    this.voltar();
  }

  private voltar() {
    this.router.navigate(["../"], { relativeTo: this.activatedRoute });
  }
}
