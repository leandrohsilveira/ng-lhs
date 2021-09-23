import {ButtonComponent, ButtonModule} from 'button'
import {render, RenderResult} from '@testing-library/angular'
import {Component} from '@angular/core'
import {ButtonPO} from 'testing'

@Component({
  template: `
    <lhs-button (click)="clicked = true">Label</lhs-button>
  `,
})
class TestComponent {
  clicked = false
}

describe('ButtonComponent', () => {
  let po: ButtonPO<TestComponent>
  beforeEach(async () => {
    po = new ButtonPO(
      await render(TestComponent, {
        imports: [ButtonModule],
        declarations: [TestComponent],
      }),
      'Label'
    )
  })

  it('Should render the button element', () => {
    expect(po.element).toBeDefined()
  })

  it('Should emit a click event when the button element is clicked', async () => {
    await po.click()

    expect(po.host.clicked).toBeTrue()
  })
})
