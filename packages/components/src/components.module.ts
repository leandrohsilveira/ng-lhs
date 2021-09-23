import {NgModule} from '@angular/core'
import {PageTitleModule} from './page-title'
import {ButtonModule} from './button'
import {BreadcrumbModule} from './breadcrumb'
import {ListModule} from './list'
import {
  FieldModule,
  FormModule,
  FieldGroupModule,
  FieldSuggestionModule,
  FieldCheckradioContainerModule,
} from './form'

@NgModule({
  exports: [
    ListModule,
    PageTitleModule,
    ButtonModule,
    BreadcrumbModule,
    FieldModule,
    FormModule,
    ListModule,
    FieldGroupModule,
    FieldSuggestionModule,
    FieldCheckradioContainerModule,
  ],
})
export class ComponentsModule {}
