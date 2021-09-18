import {Component, Input, OnInit, Optional} from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router'
import {BehaviorSubject} from 'rxjs'
import {TBreadcrumbItem} from './breadcrumb'

class BreadcrumbItem {
  constructor(private item: TBreadcrumbItem, private router?: Router) {}

  get label() {
    return this.item.label
  }

  get current() {
    return this.item.kind === 'current'
  }

  onClick() {
    switch (this.item.kind) {
      case 'action':
        this.item.onClick()
        break
      case 'link':
        this.router?.navigate(['/', ...this.item.navigation])
        break
      case 'current':
      default:
        break
    }
  }
}

@Component({
  selector: 'lhs-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
})
export class BreadcrumbComponent implements OnInit {
  constructor(
    @Optional() private router?: Router,
    @Optional() private activatedRoute?: ActivatedRoute
  ) {}

  private _items: TBreadcrumbItem[]

  get items() {
    return this._items
  }

  @Input()
  set items(items) {
    this._items = items
    if (items) {
      this.items$.next(
        items.map((item) => new BreadcrumbItem(item, this.router))
      )
    } else {
      this.items$.next([])
    }
  }

  items$ = new BehaviorSubject<BreadcrumbItem[]>([])

  ngOnInit() {
    if (this.activatedRoute) {
      const breadcrumbRoutes = this.findRoutesWithBreadcrumb()
      if (breadcrumbRoutes.length) {
        this.items = [
          ...breadcrumbRoutes.map((rota) =>
            this.convertRouteToBreadcrumbItem(rota)
          ),
          ...(this.items ?? []),
        ]
      }
    }
  }

  private convertRouteToBreadcrumbItem(route: ActivatedRoute): TBreadcrumbItem {
    const label = this.getBreadcrumbItemTitle(route)
    if (route.snapshot === this.activatedRoute.snapshot) {
      return {
        label,
        kind: 'current',
      }
    } else {
      return {
        label,
        kind: 'link',
        navigation: route.snapshot.url.map((segment) => segment.path),
      }
    }
  }

  private findRoutesWithBreadcrumb() {
    return (
      this.activatedRoute?.pathFromRoot.filter(this.isRouteWithBreadcrumb) ?? []
    )
  }

  private isRouteWithBreadcrumb(route: ActivatedRoute) {
    const data = route.routeConfig?.data ?? {}
    return data.breadcrumb || (data.title && !data.hideBreadcrumb)
  }

  private getBreadcrumbItemTitle(route: ActivatedRoute) {
    const data = route.routeConfig?.data
    return data?.breadcrumb ?? data?.title
  }
}
