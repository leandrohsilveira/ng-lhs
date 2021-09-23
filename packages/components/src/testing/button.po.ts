import {fireEvent, RenderResult} from '@testing-library/angular'

export class ButtonPO<Component> {
  constructor(
    private rendered: RenderResult<Component>,
    public text: string,
    public id?: string
  ) {
    this.host = rendered.fixture.componentInstance
  }

  host: Component

  get element() {
    if (this.id) return this.rendered.getByTestId(this.id)
    return this.rendered.getByText(this.text, {selector: 'lhs-button>button'})
  }

  async click() {
    await fireEvent.click(this.element)
  }
}
