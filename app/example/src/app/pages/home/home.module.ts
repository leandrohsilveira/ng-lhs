import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {HomeComponent} from './home.component'
import {HomeRoutingModule} from './home-routing.module'
import {ComponentsModule} from '../../modules/components'
import {AppI18nModule} from '../../i18n'

@NgModule({
  imports: [CommonModule, ComponentsModule, HomeRoutingModule, AppI18nModule],
  declarations: [HomeComponent],
})
export class HomeModule {}
