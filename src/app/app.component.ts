import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";
import {SubscriptionService} from "./core/subscription.service";
import {AuthService} from "./core/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit, OnDestroy {
  public title: string = 'Proyecto';
  public show: boolean = false;

  private currentUrlPath: string = '';

  constructor(
    private router: Router,
    private subscriptionService: SubscriptionService
  ) {
  }

  public ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.currentUrlPath = this.router.routerState.snapshot.url;
        this.show = this.currentUrlPath !== '/user/register' && this.currentUrlPath !== '/user/login'
      });
  }

  public ngOnDestroy(): void {
    this.subscriptionService.unsubscribeAll();
  }

}
