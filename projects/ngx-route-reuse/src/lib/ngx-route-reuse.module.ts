import { NgModule } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';

import { NgxRouteReuseStore } from './ngx-route-reuse-store.service';
import { NgxRouteReuseStrategy } from './ngx-route-reuse-strategy';

@NgModule({
  providers: [
    NgxRouteReuseStore,
    {
      provide: RouteReuseStrategy,
      useClass: NgxRouteReuseStrategy,
    },
  ],
})
export class NgxRouteReuseModule {}
