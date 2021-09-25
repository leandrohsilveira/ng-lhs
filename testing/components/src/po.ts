import {RenderResult} from '@testing-library/angular'

export abstract class AbstractPO<Component> {
  constructor(protected result: RenderResult<Component>) {
    this.host = result.fixture.componentInstance
  }

  host: Component
}
