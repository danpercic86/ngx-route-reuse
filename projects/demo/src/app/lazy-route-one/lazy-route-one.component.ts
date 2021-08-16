import { Component } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { OnAttach, OnDetach } from '../../../../ngx-route-reuse/src/lib/interfaces';

@Component({
  selector: 'app-lazy-route-one',
  templateUrl: './lazy-route-one.component.html',
  styleUrls: ['./lazy-route-one.component.scss']
})
export class LazyRouteOneComponent implements OnAttach, OnDetach {
  ngOnAttach(previousRoute: ActivatedRouteSnapshot): void {
    // eslint-disable-next-line no-console
    console.debug('LazyRouteOneComponent', 'on attach with route: ', previousRoute);
  }

  ngOnDetach(): void {
    // eslint-disable-next-line no-console
    console.debug('LazyRouteOneComponent', 'destroyed');
  }
}
