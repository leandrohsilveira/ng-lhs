import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BreadcrumbComponent } from "./breadcrumb.component";
import { ButtonModule } from "../button";

@NgModule({
  imports: [CommonModule, ButtonModule],
  declarations: [BreadcrumbComponent],
  exports: [BreadcrumbComponent]
})
export class BreadcrumbModule {}
