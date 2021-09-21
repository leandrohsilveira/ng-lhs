import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {HomeComponent} from './home.component'
import {HomeRoutingModule} from './home-routing.module'
import {ComponentsModule} from '@ngx-lhs/components'

@NgModule({
  imports: [CommonModule, ComponentsModule, HomeRoutingModule],
  declarations: [HomeComponent],
})
export class HomeModule {}
