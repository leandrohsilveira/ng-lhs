import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {AppI18nModule} from '@app-modules/core'
import {AppComponent} from './app.component'
import {AppRoutingModule} from './app-routing.module'

@NgModule({
  imports: [BrowserModule, AppRoutingModule, AppI18nModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
