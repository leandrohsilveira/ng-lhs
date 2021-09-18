import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { ListItemModule } from './list-item';
import { ListPaginatorModule } from './list-paginator';

@NgModule({
  declarations: [
    ListComponent,
  ],
  imports: [
    CommonModule,
    ListItemModule,
  ],
  exports: [
    ListComponent,
    ListItemModule,
    ListPaginatorModule,
  ]
})
export class ListModule { }
