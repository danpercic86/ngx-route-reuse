import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  ActivatedRoute,
  Route,
  RouteReuseStrategy,
  Router,
} from '@angular/router';
import {
  routes as AppRoutes,
  AppRoutingModule,
} from 'projects/demo/src/app/app-routing.module';
import { AppComponent } from 'projects/demo/src/app/app.component';
import { routes as LazyRouteOneRoutes } from 'projects/demo/src/app/lazy-route-one/lazy-route-one-routing.module';

import { NgxRouteReuseStoreService } from './ngx-route-reuse-store.service';
import { NgxRouteReuseModule } from './ngx-route-reuse.module';
import { NgxRouteReuseService } from './ngx-route-reuse.service';

const testRouteReuse = (config: {
  route: Route;
  routeUrl: string;
  urls: string[];
}) => {
  describe(`route with url '${config.routeUrl}'`, () => {
    let router: Router = null;
    let fixture: ComponentFixture<AppComponent> = null;
    let strategy: RouteReuseStrategy = null;
    let store: NgxRouteReuseStoreService = null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AppRoutingModule, NgxRouteReuseModule],
        declarations: [AppComponent],
        providers: [
          NgxRouteReuseStoreService,
          NgxRouteReuseService
        ],
      });

      router = TestBed.inject(Router);
      fixture = TestBed.createComponent(AppComponent);
      strategy = TestBed.inject(RouteReuseStrategy);
      store = TestBed.inject(NgxRouteReuseStoreService)

      store.clear();
      router.initialNavigation();
    });

    it('should be reused', () => {
      expect(config.route.data.reuse).toBe(true);
    });

    config.urls.forEach((url) => {
      describe(`should be detached after '${config.routeUrl} -> ${url}' navigation`, async () => {
        let shouldDetachSpy: jest.SpyInstance;

        beforeEach(async () => {
          shouldDetachSpy = jest.spyOn(strategy, `shouldDetach`);

          await router.navigateByUrl(config.routeUrl);
          await router.navigateByUrl(url);
        });

        it(`store should have the detached route`, () => {
          expect(store.has(config.route.component)).toBeTruthy();
        });

        it(`'shouldDetach' should return 'true'`, () => {
          console.log(shouldDetachSpy.mock);
          expect(shouldDetachSpy.mock.calls[0][0]).toBeTruthy();
        });
      });
    });

    config.urls.forEach((url) => {
      describe(`should be attached after '${config.routeUrl} -> ${url}' navigation`, () => {
        let shouldAttachSpy: jest.SpyInstance;
        let startRoute: ActivatedRoute;
        let endRoute: ActivatedRoute;

        beforeEach(async () => {
          shouldAttachSpy = jest.spyOn(strategy, `shouldAttach`);

          await router.navigateByUrl(config.routeUrl);

          startRoute = fixture.debugElement
            .query(By.directive(config.route.component))
            .injector.get(ActivatedRoute);

          await router.navigateByUrl(url);
          await router.navigateByUrl(config.routeUrl);

          endRoute = fixture.debugElement
            .query(By.directive(config.route.component))
            .injector.get(ActivatedRoute);
        });

        it(`the store should not have the attached route`, () => {
          expect(store.has(config.route.component)).toBeFalsy();
        });

        it(`the strategy 'shouldAttach' should return 'true'`, () => {
          console.log(shouldAttachSpy.mock);
          expect(shouldAttachSpy.mock.calls[0][0]).toBeTruthy();
        });

        it(`'ActivatedRoute' should be the same`, () => {
          expect(startRoute).toBe(endRoute);
        });
      });
    });
  });
};

describe('NgxRouteReuseStrategy', () => {
  testRouteReuse({
    route: AppRoutes[0],
    routeUrl: 'one',
    urls: ['two', 'lazy-one', 'lazy-two'],
  });

  testRouteReuse({
    route: LazyRouteOneRoutes[0],
    routeUrl: 'lazy-one',
    urls: ['one', 'two', 'lazy-two'],
  });
});
