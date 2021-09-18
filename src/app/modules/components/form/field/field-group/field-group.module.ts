import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldGroupComponent } from './field-group.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FieldGroupComponent],
  exports: [FieldGroupComponent],
})
export class FieldGroupModule { }