import {RenderResult} from '@testing-library/angular'

export abstract class AbstractPO<Component> {
  constructor(protected result: RenderResult<Component>) {
    this.component = result.fixture.componentInstance
  }

  component: Component
}
