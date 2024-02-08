import {Component, ElementRef, OnDestroy, Renderer2, ViewChild,} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {optionList} from '../../options/option-list';
import {ScreenSizeService} from "../../core/services/screen-size/screen-size.service";
import {AuthService} from "../../core/services/auth/auth.service";
import {NavigationService} from "../../core/services/navigation/navigation.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
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

  public navigateTo(route: string): void {
    this._navigationService.navigateByUrl(route).finally(() => {
      if (this._isOpenMenu) {
        this.toggleMenu();
      }
    });
  }

  public logout(): void {
    this._authService.logout();
  }

  public toggleMenu(): void {
    if (this._mobileScreen) {
      this._isOpenMenu = !this._isOpenMenu;
    }
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

  public isActiveRoute(route: string): boolean {
    return this._router.url === route;
  }

  private toggleUserMenu(): void {
    this._isOpenUserMenu = !this._isOpenUserMenu;
  }

  public ngOnDestroy(): void {
    this.unsubscribeAll();
  }

  private startSubscriptions(): void {
    this._subscriptions.push(
      this._screenSizeService.screenWidth?.subscribe({
        next: (value: number) => (this._mobileScreen = value < 640),
      })
    );
  }

  private unsubscribeAll(): void {
    this._subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe()
    );
  }
}
