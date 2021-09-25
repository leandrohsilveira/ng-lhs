import {LibUsuarioModule} from '@app-modules/user'
import {render, RenderResult} from '@testing-library/angular'
import {UsuarioListarModule} from './usuario-listar.module'
import {UsuarioListarComponent} from './usuario-listar.component'
import {RouterModule} from '@angular/router'
import {ButtonPO} from '@app-testing/components'

describe('UsuarioListarComponent', () => {
  let result: RenderResult<UsuarioListarComponent>

  beforeEach(async () => {
    result = await render(UsuarioListarComponent, {
      imports: [
        RouterModule.forRoot([]),
        UsuarioListarModule,
        LibUsuarioModule,
      ],
      routes: [],
      componentProperties: {},
    })
  })

  it('should create', async () => {
    const po = new ButtonPO(result, 'Adicionar Usuário')

    expect(po.element).toBeDefined()
  })
})
