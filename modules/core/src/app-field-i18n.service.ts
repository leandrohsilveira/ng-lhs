import {Injectable} from '@angular/core'
import {IFieldI18nService} from '@ngx-lhs/components'

@Injectable()
export class AppFieldI18nService implements IFieldI18nService {
  getRequiredErrorMessage(): string {
    return `Campo obrigatório`
  }

  getEmailErrorMessage(): string {
    return `E-mail inválido`
  }

  getMinLengthErrorMessage(
    label: string,
    {requiredLength}: {requiredLength: number}
  ): string {
    if (requiredLength === 1) return `Tamanho mínimo de um caracter`
    return `Tamanho mínimo de ${requiredLength} caracteres`
  }

  getMaxLengthErrorMessage(
    label: string,
    {requiredLength}: {requiredLength: number}
  ): string {
    if (requiredLength === 1) return `Tamanho máximo de um caracter`
    return `Tamanho máximo de ${requiredLength} caracteres`
  }

  getMinNumberErrorMessage(label: string, {min}: {min: number}): string {
    return `Deve ser maior ou igual a ${min}`
  }

  getMaxNumberErrorMessage(label: string, {max}: {max: number}): string {
    return `Deve ser menor ou igual a ${max}`
  }

  getCustomErrorMessage(
    error: string,
    label: string,
    props: any
  ): string | null {
    switch (error) {
      case 'confirmarSenha':
        return 'As senhas devem ser idênticas'
      default:
        return null
    }
  }
}
