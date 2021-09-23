import {RenderResult} from '@testing-library/angular'
import {AbstractPO} from './po'

export class PageTitlePO<Component> extends AbstractPO<Component> {
  constructor(result: RenderResult<Component>, public titleText: string) {
    super(result)
  }

  private selector = 'lhs-page-title>.container'

  get title() {
    return this.result.getByText(this.titleText, {
      selector: `${this.selector}>h1`,
    })
  }

  getChildElementByText(text: string, selector: string) {
    return this.result.getByText(text, {
      selector: `${this.selector}>.acoes ${selector}`,
    })
  }
}
