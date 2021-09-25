import {CommonModule} from '@angular/common'
import {Component, Input} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {fireEvent, render} from '@testing-library/angular'
import {PageTitleModule} from 'page-title'
import {PageTitlePO} from '@app-testing/components'

@Component({
  template: `
    <lhs-page-title [text]="title">
      <button (click)="clicked = true">Button</button>
    </lhs-page-title>
  `,
})
class HostComponent {
  @Input()
  title?: string

  clicked = false
}

describe('PageTitleComponent', () => {
  const title = 'Title'
  const imports = [CommonModule, PageTitleModule]
  const declarations = [HostComponent]

  it('Should display the title text from "text" input', async () => {
    const po = new PageTitlePO(
      await render(HostComponent, {
        componentProperties: {title},
        imports,
        declarations,
      }),
      title
    )

    expect(po.title.textContent).toContain(title)
  })

  it('Should display the title text from activated route data "title"', async () => {
    const activatedRoute = jasmine.createSpyObj<ActivatedRoute>(
      'ActivatedRoute',
      ['snapshot']
    )
    activatedRoute.snapshot.data = {title}
    const po = new PageTitlePO(
      await render(HostComponent, {
        imports,
        declarations,
        providers: [{provide: ActivatedRoute, useValue: activatedRoute}],
      }),
      title
    )

    expect(po.title.textContent).toContain(title)
  })

  it('Should display the child content', async () => {
    const po = new PageTitlePO(
      await render(HostComponent, {
        imports,
        declarations,
      }),
      title
    )

    const childButton = po.getChildElementByText('Button', 'button')

    await fireEvent.click(childButton)

    expect(po.host.clicked).toBeTrue()
  })
})
