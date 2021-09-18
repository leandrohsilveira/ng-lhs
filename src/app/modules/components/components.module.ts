import { NgModule } from '@angular/core';
import { PageTitleModule } from './page-title';
import { ButtonModule } from './button';
import { BreadcrumbModule } from './breadcrumb';
import { FieldModule, FormModule, FieldGroupModule, FieldSuggestionModule, FieldCheckradioContainerModule } from './form';
import { ListModule } from './list';

@NgModule({
  exports: [
    ListModule,
    PageTitleModule,
    ButtonModule,
    BreadcrumbModule,
    FieldModule,
    FormModule,
    FieldGroupModule,
    FieldSuggestionModule,
    FieldCheckradioContainerModule,
  ],
})
export class ComponentsModule { }