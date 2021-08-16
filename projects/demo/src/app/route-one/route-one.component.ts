import { Component } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { OnAttach, OnDetach } from '../../../../ngx-route-reuse/src/lib/interfaces';

@Component({
  selector: 'app-route-one',
  templateUrl: './route-one.component.html',
  styleUrls: ['./route-one.component.scss']
})
export class RouteOneComponent implements OnAttach, OnDetach {
  ngOnAttach(previousRoute: ActivatedRouteSnapshot): void {
    // eslint-disable-next-line no-console
    console.debug('RouteOneComponent', 'on attach with previous route: ', previousRoute);
  }

  ngOnDetach(): void {
    // eslint-disable-next-line no-console
    console.debug('RouteOneComponent', 'destroyed');
  }
}
