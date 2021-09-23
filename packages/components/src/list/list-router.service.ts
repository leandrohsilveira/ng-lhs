import {Injectable} from '@angular/core'
import {ActivatedRoute, Data, Params, Router} from '@angular/router'
import {combineLatest, map, Observable} from 'rxjs'

export type RouteInputParams = {
  path: Record<string, string>
  query: Record<string, string[]>
}

export type RouteInput = {
  data: Data
  page: number
  size: number
  params: RouteInputParams
}

@Injectable({
  providedIn: 'root',
})
export class ListRouterService {
  static INITIAL_SIZE = 10

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.input$ = combineLatest({
      data: this.activatedRoute.data,
      query: this.activatedRoute.queryParams,
      params: this.activatedRoute.params,
    }).pipe(
      map(({data, query: {page, size, ...query}, params}) => ({
        data,
        page: page ? Number(page) : 1,
        size: size ? Number(size) : ListRouterService.INITIAL_SIZE,
        params: {
          query,
          path: params,
        },
      }))
    )
  }

  input$: Observable<RouteInput>

  maxPages?: number

  get count() {
    return (this.maxPages ?? 0) * this.size
  }

  set count(count) {
    this.maxPages = Math.trunc(count / this.size) + 1
  }

  get queryParams() {
    return this.activatedRoute.snapshot.queryParams
  }

  set queryParams(queryParams) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams,
    })
  }

  get query() {
    const {page, size, ...query} = this.queryParams
    return query
  }

  set query(query) {
    const {page, size} = this.queryParams
    this.queryParams = {...query, page, size}
  }

  get page() {
    return this.queryParams.page ? Number(this.queryParams.page) : 1
  }

  set page(page) {
    this.mergeQueryParams({page: String(page)})
  }

  get size() {
    return this.queryParams.size
      ? Number(this.queryParams.size)
      : ListRouterService.INITIAL_SIZE
  }

  set size(size) {
    this.maxPages = Math.trunc(this.count / size) + 1
    const page = this.maxPages > this.page ? this.maxPages : this.page
    this.mergeQueryParams({size: String(size), page: String(page)})
  }

  get hasNextPage() {
    return typeof this.maxPages === 'number' && this.maxPages > this.page
  }

  get hasPreviousPage() {
    return this.page > 1
  }

  firstPage() {
    if (this.hasPreviousPage) {
      this.page = 1
    }
  }

  lastPage() {
    if (this.hasNextPage) {
      this.page = this.maxPages ?? 0
    }
  }

  nextPage() {
    if (this.hasNextPage) {
      this.page = this.page + 1
    }
  }

  previousPage() {
    if (this.hasPreviousPage) {
      this.page = this.page - 1
    }
  }

  private mergeQueryParams(queryParams: Params) {
    this.queryParams = {
      ...this.queryParams,
      ...queryParams,
    }
  }
}
