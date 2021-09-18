import { InjectionToken } from "@angular/core";

export const FIELD_I18N_SERVICE = new InjectionToken("FIELD_I18N_SERVICE");

export interface IFieldI18nService {

  getRequiredErrorMessage(label: string): string;

  getEmailErrorMessage(label: string): string;

  getMinLengthErrorMessage(label: string, props: { requiredLength: number, actualLength: number }): string;

  getMaxLengthErrorMessage(label: string, props: { requiredLength: number, actualLength: number }): string;

  getMinNumberErrorMessage(label: string, props: { min: number }): string;

  getMaxNumberErrorMessage(label: string, props: { max: number }): string;

  getCustomErrorMessage(error: string, label: string, props: any): string;

}