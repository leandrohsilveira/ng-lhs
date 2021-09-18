import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPaginatorComponent } from './list-paginator.component';
import { ButtonModule } from '../../button';

@NgModule({
  declarations: [
    ListPaginatorComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
  ],
  exports: [
    ListPaginatorComponent
  ]
})
export class ListPaginatorModule { }
