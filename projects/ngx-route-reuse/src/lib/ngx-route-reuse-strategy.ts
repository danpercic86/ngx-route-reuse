import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';

import { NgxRouteReuseStoreService } from './ngx-route-reuse-store.service';

const shouldReuse = (route: ActivatedRouteSnapshot) => !!route.data.reuse;

export class NgxRouteReuseStrategy implements RouteReuseStrategy {
  constructor(private readonly _storeService: NgxRouteReuseStoreService) {}

  // eslint-disable-next-line class-methods-use-this
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return shouldReuse(route);
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    if (handle) this._storeService.set(route.component, handle);
    else this._storeService.delete(route.component);
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return shouldReuse(route) ? this._storeService.has(route.component) : false;
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    return shouldReuse(route) ? this._storeService.get(route.component) : null;
  }

  // eslint-disable-next-line class-methods-use-this
  shouldReuseRoute(future: ActivatedRouteSnapshot, current: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === current.routeConfig;
  }
}
