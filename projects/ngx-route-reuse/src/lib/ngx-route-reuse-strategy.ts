import { ActivatedRouteSnapshot, RouteReuseStrategy } from '@angular/router';

import { NgxRouteReuseStore } from './ngx-route-reuse-store.service';
import { getRoutePath } from './utils';
import { NgxDetachedRouteHandle } from './interfaces';

const shouldReuse = (route: ActivatedRouteSnapshot) => !!route.data.reuse;

export class NgxRouteReuseStrategy implements RouteReuseStrategy {
  constructor(private readonly _storeService: NgxRouteReuseStore) {}

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return shouldReuse(route);
  }

  store(route: ActivatedRouteSnapshot, handle: NgxDetachedRouteHandle): void {
    if (handle) this._storeService.set(handle, route);
    else this._storeService.delete(route);
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return this._storeService.has(route);
  }

  retrieve(route: ActivatedRouteSnapshot): NgxDetachedRouteHandle | null {
    return this._storeService.get(route).handle;
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, current: ActivatedRouteSnapshot): boolean {
    return (
      future.routeConfig === current.routeConfig || getRoutePath(future) === getRoutePath(current)
    );
  }
}
