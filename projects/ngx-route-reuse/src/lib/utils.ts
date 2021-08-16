import { ActivatedRouteSnapshot } from '@angular/router';

export const getRoutePath = (route: ActivatedRouteSnapshot): string =>
  route.pathFromRoot
    .map((el: ActivatedRouteSnapshot) => el.routeConfig.path + JSON.stringify(el.params))
    .filter(str => str.length > 0)
    .join('');
