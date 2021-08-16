import { Injectable, Type } from '@angular/core';
import { DetachedRouteHandle } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export enum StoreActionType {
  Set,
  Delete,
  Clear,
}

export interface StoreAction {
  type: StoreActionType;
  component?: string | Type<unknown>;
}

export interface StoreActionOptions {
  emitEvent?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class NgxRouteReuseStoreService {
  private readonly _detachedRouteHandles = new Map<string | Type<unknown>, DetachedRouteHandle>();

  private readonly _action$ = new Subject<StoreAction>();

  private _dispatch(type: StoreActionType, component: string | Type<unknown> = null): void {
    this._action$.next({ type, component });
  }

  on(type: StoreActionType, component: string | Type<unknown>): Observable<string | Type<unknown>> {
    return this._action$.pipe(
      filter(action => action.type === type),
      filter(action => action.component === component),
      map(action => action.component),
    );
  }

  set(
    component: string | Type<unknown>,
    handle: DetachedRouteHandle,
    { emitEvent = true }: StoreActionOptions = {},
  ): void {
    this._detachedRouteHandles.set(component, handle);

    if (emitEvent) {
      this._dispatch(StoreActionType.Set, component);
    }
  }

  get(component: string | Type<unknown>): DetachedRouteHandle {
    return this._detachedRouteHandles.get(component);
  }

  has(component: string | Type<unknown>): boolean {
    return this._detachedRouteHandles.has(component);
  }

  delete(
    component: string | Type<unknown>,
    { emitEvent = true }: StoreActionOptions = {},
  ): boolean {
    const deleted = this._detachedRouteHandles.delete(component);

    if (emitEvent && deleted) {
      this._dispatch(StoreActionType.Delete, component);
    }

    return deleted;
  }

  clear({ emitEvent = true }: StoreActionOptions = {}): void {
    this._detachedRouteHandles.clear();

    if (emitEvent) {
      this._dispatch(StoreActionType.Clear);
    }
  }
}
