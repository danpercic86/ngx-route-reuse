import { ActivatedRoute, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';
import { ComponentRef } from '@angular/core';

export interface OnAttach {
  ngOnAttach(previousRoute: ActivatedRouteSnapshot);
}

export interface OnDetach {
  ngOnDetach();
}

export interface StoreObject {
  handle: NgxDetachedRouteHandle;
  previousRoute: ActivatedRouteSnapshot;
}

export interface NgxDetachedRouteHandle extends DetachedRouteHandle {
  componentRef?: ComponentRef<unknown>;
  contexts?: Map<unknown, unknown>;
  route?: {
    children?: [];
    value?: ActivatedRoute;
  };
}
