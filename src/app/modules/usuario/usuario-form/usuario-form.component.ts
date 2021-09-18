import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from "@angular/core";
import { Subject } from "rxjs";
import { distinctUntilChanged, map, takeUntil } from "rxjs/operators";
import { IUsuarioFormValue, UsuarioFormGroup } from "../usuario-form";
import { IPapelVisualizacao } from "../papel";
import { ISuggestionService } from "../../components";

@Component({
  selector: "app-usuario-form",
  templateUrl: "./usuario-form.component.html",
  styleUrls: ["./usuario-form.component.css"]
})
export class UsuarioFormComponent implements OnInit, OnDestroy {
  @Input()
  editar = false;

  @Input()
  valido = false;

  @Input()
  dados?: IUsuarioFormValue;

  @Input()
  papelSuggestion: ISuggestionService<IPapelVisualizacao>;

  @Output()
  dadosChange = new EventEmitter<IUsuarioFormValue>();

  @Output()
  validoChange = new EventEmitter<boolean>();

  @Output()
  formSubmit = new EventEmitter();

  formulario: UsuarioFormGroup;

  private ngOnDestroy$ = new Subject();

  ngOnInit() {
    this.formulario = new UsuarioFormGroup(this.dados, this.editar);

    this.formulario.valueChanges
      .pipe(takeUntil(this.ngOnDestroy$))
      .subscribe(this.dadosChange);

    this.formulario.statusChanges
      .pipe(
        takeUntil(this.ngOnDestroy$),
        map(status => status === "VALID"),
        distinctUntilChanged()
      )
      .subscribe(this.validoChange);
  }

  ngOnDestroy() {
    this.ngOnDestroy$.next(undefined);
    this.ngOnDestroy$.complete();
  }

  onFormSubmit() {
    if (this.valido) {
      this.formSubmit.emit();
    }
  }
  
  onAddPapel() {
    this.formulario.papeis.add();
  }

  onRemoverPapel(index: number) {
    this.formulario.papeis.removeAt(index);
  }

  onPapelFormSubmit(e?: Event) {
    e?.preventDefault();
    this.onAddPapel();
  }
}
