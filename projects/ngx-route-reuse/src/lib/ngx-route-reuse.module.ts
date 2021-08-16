import { NgModule } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';

import { NgxRouteReuseStoreService } from './ngx-route-reuse-store.service';
import { NgxRouteReuseService } from './ngx-route-reuse.service';
import { NgxRouteReuseStrategy } from './ngx-route-reuse-strategy';

@NgModule({
  providers: [
    NgxRouteReuseService,
    NgxRouteReuseStoreService,
    {
      provide: RouteReuseStrategy,
      useClass: NgxRouteReuseStrategy,
    },
  ],
})
export class NgxRouteReuseModule {}
