import {Component, ElementRef, OnDestroy, Renderer2, ViewChild,} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {optionList} from '../../options/option-list';
import {ScreenSizeService} from '../../core/services/screen-size/screen-size.service';
import {AuthService} from '../../core/services/auth/auth.service';
import {NavigationService} from '../../core/services/navigation/navigation.service';
import {environment} from '../../../environments/environment';
import {softFade} from '../../utils/animations/soft-fade';
import {NavbarConfig, UserAction, UserOption} from './navbar-config';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [softFade],
})
export class NavbarComponent implements OnDestroy {
  @ViewChild('menuButton') private menuButton: ElementRef | undefined;
  @ViewChild('userButton') private userButton!: ElementRef;
  @ViewChild('menu') private menu: ElementRef | undefined;

  protected readonly optionList: any[] = optionList;

  private _subscriptions: Subscription[] = [];
  private _isOpenUserMenu: boolean = false;
  private _isOpenMenu: boolean = false;
  private _mobileScreen!: boolean;

  protected readonly environment = environment;
  protected readonly NavbarConfig = NavbarConfig;

  constructor(
    private _renderer: Renderer2,
    private _router: Router,
    private _screenSizeService: ScreenSizeService,
    private _authService: AuthService,
    private _navigationService: NavigationService
  ) {
    this.startSubscriptions();
    this.enableClickListener();
  }

  get isOpenUserMenu(): boolean {
    return this._isOpenUserMenu;
  }

  get showMobileMenu(): boolean {
    return this._isOpenMenu;
  }

  public executeAction(option: UserOption): void {
    if (option.action !== undefined) {
      switch (option.action) {
        case UserAction.LOGOUT:
          this.logout();
      }
    } else if (option.routerLink) {
      this.navigateTo(option.routerLink);
    }
  }

  public isActiveRoute(route: string): boolean {
    return this._router.url === route;
  }

  public navigateTo(route: string): void {
    this._navigationService.navigateByUrl(route).finally(() => {
      if (this._isOpenMenu) {
        this.toggleMenu();
      }
    });
  }

  public toggleMenu(): void {
    if (this._mobileScreen) {
      this._isOpenMenu = !this._isOpenMenu;
    }
  }

  public getOptionClasses(option: UserOption): string {
    let classes;
    classes = option.hoverColor
      ? `hover:bg-${option.hoverColor}`
      : 'hover:bg-slate-100 dark:hover:bg-slate-700';
    classes += option.hoverText
      ? ` hover:text-${option.hoverText}`
      : ` hover:text-gray-700 dark:hover:text-gray-100`;

    if (option.routerLink && this.isActiveRoute(option.routerLink)) {
      classes += ' bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-white';
    } else {
      classes += ' bg-transparent text-gray-500 dark:text-gray-300';
    }

    return classes;
  }

  private logout(): void {
    this._authService.logout();
  }

  private enableClickListener(): void {
    this._renderer.listen('window', 'click', (e: Event): void => {
      if (
        this.userButton.nativeElement.contains(e.target) ||
        this._isOpenUserMenu
      ) {
        this.toggleUserMenu();
      }
      if (
        !this.menu?.nativeElement.contains(e.target) &&
        this.menuButton?.nativeElement.contains(e.target)
      ) {
        this.toggleMenu();
      }
    });
  }

  private toggleUserMenu(): void {
    this._isOpenUserMenu = !this._isOpenUserMenu;
  }

  public ngOnDestroy(): void {
    this.unsubscribeAll();
  }

  private startSubscriptions(): void {
    this._mobileScreen = window.innerWidth < 1024;
    this._subscriptions.push(
      this._screenSizeService.screenWidth$?.subscribe({
        next: (value: number) => {
          this._mobileScreen = value < 1024;
        },
      })
    );
  }

  private unsubscribeAll(): void {
    this._subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe()
    );
  }
}
