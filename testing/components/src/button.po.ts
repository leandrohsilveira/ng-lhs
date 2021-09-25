import {fireEvent, RenderResult} from '@testing-library/angular'
import {AbstractPO} from './po'

export class ButtonPO<Component> extends AbstractPO<Component> {
  constructor(
    result: RenderResult<Component>,
    public text: string,
    public id?: string
  ) {
    super(result)
  }

  get element() {
    if (this.id) return this.result.getByTestId(this.id)
    return this.result.getByText(this.text, {selector: 'lhs-button>button'})
  }

  async click() {
    await fireEvent.click(this.element)
  }
}
