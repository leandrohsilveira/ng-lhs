import {TestBed} from '@angular/core/testing'

import {ListRouterService} from './list-router.service'

describe('ListRouterService', () => {
  let service: ListRouterService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(ListRouterService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
