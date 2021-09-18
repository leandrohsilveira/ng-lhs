import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { AppI18nModule } from "./i18n/app-i18n.module";

@NgModule({
  imports: [BrowserModule, AppRoutingModule, AppI18nModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
