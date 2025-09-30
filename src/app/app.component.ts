import {Component, HostBinding, HostListener, OnDestroy} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter, Subscription} from 'rxjs';
import {DarkModeService} from './core/services/dark-mode/dark-mode.service';
import {MediaCheckService} from './core/services/media-check/media-check.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {

  @HostListener('click', ['${event}'])
  public onClick(): void {
    this.mediaCheckService.emitClick();
  }

  @HostBinding('class.dark') get mode() {
    return this.darkModeService.darkMode();
  }

  public title: string = 'NoteThat';
  public showNavbar: boolean = false;

  private readonly routerSubscription: Subscription;
  private currentUrlPath: string = '';

  constructor(
    private router: Router,
    private mediaCheckService: MediaCheckService,
    private darkModeService: DarkModeService
  ) {
    this.routerSubscription = this.router.events
      ?.pipe(filter((event) => event instanceof NavigationEnd))
      ?.subscribe({
        next: (): void => {
          this.currentUrlPath = this.router.routerState.snapshot.url;
          this.showNavbar =
            this.currentUrlPath !== '/user/register' &&
            this.currentUrlPath !== '/user/login';
        },
      });
  }

  public ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }
}
