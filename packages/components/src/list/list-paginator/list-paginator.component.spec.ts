import {CommonModule} from '@angular/common'
import {ComponentFixture, TestBed} from '@angular/core/testing'
import {ComponentsModule} from 'components.module'

import {ListPaginatorComponent} from './list-paginator.component'

describe('ListPaginatorComponent', () => {
  let component: ListPaginatorComponent
  let fixture: ComponentFixture<ListPaginatorComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, ComponentsModule],
      declarations: [ListPaginatorComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPaginatorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
