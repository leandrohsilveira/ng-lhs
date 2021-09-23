import {CommonModule} from '@angular/common'
import {ComponentFixture, TestBed} from '@angular/core/testing'
import {ListItemModule, ListComponent} from 'list'

describe('ListComponent', () => {
  let component: ListComponent
  let fixture: ComponentFixture<ListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, ListItemModule],
      declarations: [ListComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
