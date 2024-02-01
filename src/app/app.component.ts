import {
  Component,
  HostBinding,
  HostListener,
  Inject,
  OnDestroy
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { AuthService } from './core/services/auth/auth.service';
import { DarkModeService } from './core/services/dark-mode/dark-mode.service';
import { MediaCheckService } from './core/services/media-check/media-check.service';
import { SubscriptionService } from './core/services/subscription/subscription.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  private _subscriptionService = Inject(SubscriptionService);

  @HostListener('click', ['${event}'])
  public onClick(): void {
    this.mediaCheckService.emitClick();
  }

  @HostBinding('class.dark') get mode() {
    return this.darkModeService.darkMode();
  }

  public title: string = 'NoteThat';
  public show: boolean = false;

  private routerSubscription: Subscription;
  private currentUrlPath: string = '';

  constructor(
    private router: Router,
    private mediaCheckService: MediaCheckService,
    private authService: AuthService,
    private darkModeService: DarkModeService
  ) {
    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe({
        next: (): void => {
          this.currentUrlPath = this.router.routerState.snapshot.url;
          this.show =
            this.currentUrlPath !== '/user/register' &&
            this.currentUrlPath !== '/user/login';
        },
      });
  }

  get sessionExpiredMessage(): string {
    return 'Tu sesión ha expirado';
  }

  get sessionExpired(): boolean {
    return this.authService.sessionExpired;
  }
  public getContentClasses(): string {
    return this.show ? 'h-[calc(100vh-4rem)] mt-16' : 'h-[calc(100vh)]';
  }

  public ngOnDestroy(): void {
    this._subscriptionService.unsubscribe(this.routerSubscription);
  }
}
