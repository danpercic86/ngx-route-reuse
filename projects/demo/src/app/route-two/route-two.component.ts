import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-route-two',
  templateUrl: './route-two.component.html',
  styleUrls: ['./route-two.component.scss']
})
export class RouteTwoComponent implements OnInit, OnDestroy {
  ngOnInit(): void {
    // eslint-disable-next-line no-console
    console.debug('RouteTwoComponent', 'inited');
  }

  ngOnDestroy(): void {
    // eslint-disable-next-line no-console
    console.debug('RouteTwoComponent', 'destroyed');
  }
}
