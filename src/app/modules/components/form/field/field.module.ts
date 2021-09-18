import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FieldComponent} from './field.component'
import {ValidationErrorModule} from './validation-error/validation-error.module'

@NgModule({
  imports: [CommonModule, ValidationErrorModule],
  declarations: [FieldComponent],
  exports: [FieldComponent, ValidationErrorModule],
})
export class FieldModule {}
