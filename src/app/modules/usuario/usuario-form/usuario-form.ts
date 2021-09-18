import { AbstractControl, FormArray, FormControl, FormGroup,  Validators } from "@angular/forms";
import { Genero } from "../usuario";
import { IPapelVisualizacao } from "../papel";

const UsuarioFormValidators = {
  senha(editar: boolean, confirmarSenha: string) {
    if(!editar) {
      return Validators.compose([
        Validators.required,
        Validators.minLength(8),
        UsuarioFormValidators.confirmarSenha(editar, confirmarSenha),
      ])
    }
    return () => null;
  },

  confirmarSenha(editar: boolean, confirmarSenhaName: string) {
    return (control: FormControl) => {
      if (!editar) {
        const senha = control.value;
        const confirmarSenha = control.parent?.controls[confirmarSenhaName]?.value;
        if (confirmarSenha && senha && confirmarSenha !== senha) {
          return { confirmarSenha: true };
        }
      }
      return null;
    }
  },

  arrayMinLength(minLength: number) {
    return (array: FormArray) => array.length >= minLength ? null : { arrayMinLength: true };
  },

  termosDeUso(editar: boolean) {
    return (control: AbstractControl) => editar ? null : Validators.requiredTrue(control);
  }
}

export interface IPapelFormValue {
  papel: IPapelVisualizacao;
  busca: string;
}

export interface IUsuarioFormValue {
  id?: string;
  nome: string;
  email: string;
  username: string;
  senha: string;
  genero?: Genero;
  papeis: IPapelFormValue[];
  termosDeUsoAceito?: boolean;
}

export class UsuarioFormGroup extends FormGroup {

  constructor(dados?: IUsuarioFormValue, editar = false) {
    super(
      {
        id: new FormControl(dados?.id),
        nome: new FormControl(dados?.nome),
        genero: new FormControl(dados?.genero),
        email: new FormControl(dados?.email, [Validators.required, Validators.email]),
        username: new FormControl({ value: dados?.username, disabled: editar }, [Validators.required, Validators.maxLength(12)]),
        senha: new FormControl(null, [UsuarioFormValidators.senha(editar, 'confirmarSenha')]),
        confirmarSenha: new FormControl(null, [UsuarioFormValidators.senha(editar, 'senha')]),
        termosDeUsoAceito: new FormControl(false, [UsuarioFormValidators.termosDeUso(editar)]),
        papeis: new PapeisFormArray(dados?.papeis),
      },
    );
  }

  get username() {
    return this.get('username') as FormGroup;
  }

  get papeis() {
    return this.get('papeis') as PapeisFormArray;
  }

}

export class PapeisFormArray extends FormArray {

  constructor(papeis: IPapelFormValue[] = []) {
    super(
      papeis.map(papel => new PapelFormGroup(papel)),
      [UsuarioFormValidators.arrayMinLength(1)]
    )
  }

  add() {
    this.push(new PapelFormGroup());
  }

}

export class PapelFormGroup extends FormGroup {
  constructor(papel?: IPapelFormValue) {
    super({
      busca: new FormControl(papel?.busca),
      papel: new FormControl(papel?.papel, [Validators.required]),
    });
  }
}