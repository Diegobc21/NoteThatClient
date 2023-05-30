import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";
import {SubscriptionService} from "./core/services/subscription.service";
import {SpinnerService} from "./core/services/spinner.service";
import {AuthService} from "./core/services/auth.service";

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
    private subscriptionService: SubscriptionService,
    private spinnerService: SpinnerService,
    private authService: AuthService
  ) {
  }

  get sessionExpiredMessage(): string {
    return 'Tu sesión ha expirado.';
  }

  get showSpinner(): boolean {
    return this.spinnerService.showSpinner;
  }

  get sessionExpired(): boolean {
    return this.authService.sessionExpired;
  }

  public ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((): void => {
        this.currentUrlPath = this.router.routerState.snapshot.url;
        this.show = this.currentUrlPath !== '/user/register' && this.currentUrlPath !== '/user/login'
      });
  }

  public ngOnDestroy(): void {
    this.subscriptionService.unsubscribeAll();
  }

}
