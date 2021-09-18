import {Component, OnInit} from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router'
import {
  IUsuarioFormValue,
  IUsuarioVisualizar,
  PapelSuggestionService,
  UsuarioFormService,
} from '@app-modules/user'

@Component({
  templateUrl: './usuario-editar.component.html',
})
export class UsuarioEditarComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formService: UsuarioFormService,
    public papelSuggestion: PapelSuggestionService
  ) {}

  valido = false

  dados: IUsuarioFormValue

  ngOnInit() {
    const data = this.activatedRoute.snapshot.data.data ?? 'usuario'
    const usuario: IUsuarioVisualizar = this.activatedRoute.snapshot.data[data]
    this.dados = this.formService.visualizar(usuario)
  }

  onAtualizarClick() {
    if (this.valido) {
      this.formService
        .editar(this.dados)
        .subscribe({next: this.onSucessoAtualizar.bind(this)})
    }
  }

  onCancelarClick() {
    this.voltar()
  }

  onSucessoAtualizar() {
    this.voltar()
  }

  private voltar() {
    this.router.navigate(['../../'], {relativeTo: this.activatedRoute})
  }
}
