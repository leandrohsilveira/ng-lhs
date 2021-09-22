import {InjectionToken} from '@angular/core'

export const FIELD_I18N_SERVICE = new InjectionToken('FIELD_I18N_SERVICE')

export interface IFieldI18nService {
  getRequiredErrorMessage(label: string | undefined): string

  getEmailErrorMessage(label: string | undefined): string

  getMinLengthErrorMessage(
    label: string | undefined,
    props: {requiredLength: number; actualLength: number}
  ): string

  getMaxLengthErrorMessage(
    label: string | undefined,
    props: {requiredLength: number; actualLength: number}
  ): string

  getMinNumberErrorMessage(
    label: string | undefined,
    props: {min: number}
  ): string

  getMaxNumberErrorMessage(
    label: string | undefined,
    props: {max: number}
  ): string

  getCustomErrorMessage(
    error: string,
    label: string | undefined,
    props: any
  ): string | null
}
