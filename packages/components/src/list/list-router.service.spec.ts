import {TestBed} from '@angular/core/testing'
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router'
import {of} from 'rxjs'

import {ListRouterService} from './list-router.service'

describe('ListRouterService', () => {
  let router: jasmine.SpyObj<Router>
  let snapshot: jasmine.SpyObj<ActivatedRouteSnapshot>
  let activatedRoute: jasmine.SpyObj<ActivatedRoute>
  let service: ListRouterService

  beforeEach(() => {
    snapshot = jasmine.createSpyObj('ActivatedRouteSnapshot', [], {
      params: {},
      data: {},
      queryParams: {},
    })
    router = jasmine.createSpyObj('Router', ['navigate'])
    activatedRoute = jasmine.createSpyObj('ActivatedRoute', [], {
      snapshot,
      params: of(snapshot.params),
      data: of(snapshot.data),
      queryString: of(snapshot.queryParams),
    })
    TestBed.configureTestingModule({
      providers: [
        {provide: Router, useValue: router},
        {provide: ActivatedRoute, useValue: activatedRoute},
      ],
    })
    service = TestBed.inject(ListRouterService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
