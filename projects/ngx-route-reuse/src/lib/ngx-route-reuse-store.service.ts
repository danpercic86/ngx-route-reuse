import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { getRoutePath } from './utils';
import { NgxDetachedRouteHandle, OnAttach, OnDetach, StoreObject } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class NgxRouteReuseStore {
  private readonly _store = new Map<string, StoreObject>();

  set(handle: NgxDetachedRouteHandle, route: ActivatedRouteSnapshot): void {
    (handle.componentRef?.instance as OnDetach)?.ngOnDetach();
    this._store.set(getRoutePath(route), { handle, previousRoute: route });
  }

  get(route: ActivatedRouteSnapshot): StoreObject {
    const storeObject = this._store.get(getRoutePath(route));
    (storeObject.handle.componentRef?.instance as OnAttach)?.ngOnAttach(storeObject.previousRoute);
    return storeObject;
  }

  has(route: ActivatedRouteSnapshot): boolean {
    return this._store.has(getRoutePath(route));
  }

  delete(route: ActivatedRouteSnapshot): boolean {
    return this._store.delete(getRoutePath(route));
  }

  clear(): void {
    this._store.clear();
  }
}
