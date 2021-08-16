import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';

import { NgxRouteReuseStoreService, StoreActionType } from './ngx-route-reuse-store.service';

/**
 * Provides access to reuse route's component attach/detach hooks
 * and detached routes store
 */
@Injectable({
  providedIn: 'root',
})
export class NgxRouteReuseService {
  constructor(private readonly _storeService: NgxRouteReuseStoreService) {}

  /**
   * `Attach` component lifecycle hook.
   *
   * Triggers on component reattach - re-navigate on reuse route.
   */
  onAttach(component: string | Type<unknown>): Observable<string | Type<unknown>> {
    return this._storeService.on(StoreActionType.Delete, component);
  }

  /**
   * `Detach` component lifecycle hook.
   *
   * Triggers on component detach - navigate from reuse route.
   */
  onDetach(component: string | Type<unknown>): Observable<string | Type<unknown>> {
    return this._storeService.on(StoreActionType.Set, component);
  }

  /**
   * Check whether component is attached
   */
  isAttached(component: string | Type<unknown>): boolean {
    return !this._storeService.has(component);
  }

  /**
   * Check whether component is detached
   */
  isDetached(component: string | Type<unknown>): boolean {
    return this._storeService.has(component);
  }

  /**
   * Delete a reuse route's component from cache
   */
  delete(component: string | Type<unknown>): boolean {
    return this._storeService.delete(component, { emitEvent: false });
  }

  /**
   * Clear the reuse route components cache
   */
  clear(): void {
    return this._storeService.clear();
  }
}
