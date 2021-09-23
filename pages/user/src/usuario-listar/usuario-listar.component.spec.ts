import {ComponentFixture, TestBed} from '@angular/core/testing'
import {UsuarioListarModule} from './usuario-listar.module'
import {UsuarioListarComponent} from './usuario-listar.component'
import {ListRouterService} from '@ngx-lhs/components'
import {PapelService, UsuarioService} from '@app-modules/user'
import {RouterModule} from '@angular/router'

describe('UsuarioListarComponent', () => {
  let component: UsuarioListarComponent
  let fixture: ComponentFixture<UsuarioListarComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioListarModule, RouterModule.forRoot([])],
      providers: [ListRouterService, PapelService, UsuarioService],
    }).compileComponents()
    fixture = TestBed.createComponent(UsuarioListarComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
