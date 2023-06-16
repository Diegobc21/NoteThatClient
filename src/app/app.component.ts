import {Component, HostListener, OnDestroy} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {filter, Subscription} from "rxjs";
import {SpinnerService} from "./core/services/spinner.service";
import {AuthService} from "./core/services/auth.service";
import {MediaCheckService} from "./core/services/media-check.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnDestroy {

  @HostListener('click', ['${event}'])
  private onClick(): void {
    this.mediaCheckService.emitClick(event as MouseEvent);
  }

  public title: string = 'NoteThat';
  public show: boolean = false;

  private routerSubscription: Subscription;
  private currentUrlPath: string = '';

  constructor(
    private router: Router,
    private spinnerService: SpinnerService,
    private mediaCheckService: MediaCheckService,
    private authService: AuthService
  ) {
    this.routerSubscription =
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe({
          next: (): void => {
            this.currentUrlPath = this.router.routerState.snapshot.url;
            this.show = this.currentUrlPath !== '/user/register' && this.currentUrlPath !== '/user/login';
          }
        });
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

  public ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

}
