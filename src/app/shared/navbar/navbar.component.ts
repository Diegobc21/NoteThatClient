import {Component, ElementRef, OnDestroy, Renderer2, ViewChild} from '@angular/core';
import {ScreenSizeService} from "../../core/services/screen-size.service";
import {AuthService} from "../../core/services/auth.service";
import {NavigationService} from "../../core/services/navigation.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {optionList} from "../../options/option-list";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnDestroy {
  @ViewChild('menuButton') private menuButton: ElementRef | undefined;
  @ViewChild('userButton') private userButton!: ElementRef;
  @ViewChild('menu') private menu: ElementRef | undefined;

  protected readonly optionList: any[] = optionList;

  public activeRouteClasses: string = 'cursor-default bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium';
  public inactiveRouteClasses: string = 'cursor-pointer text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium';
  public activeRouteClassesSm: string = 'cursor-default bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium';
  public inactiveRouteClassesSm: string = 'cursor-pointer text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium';

  private _subscriptions: Subscription[] = [];
  private _isOpenUserMenu: boolean = false;
  private _isOpenMenu: boolean = false;
  private _mobileScreen!: boolean;

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private screenSizeService: ScreenSizeService,
    private authService: AuthService,
    private navigationService: NavigationService
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

  public buttonClasses(route: string): string {
    if (this._mobileScreen) {
      return this.isActiveRoute(route) ? this.activeRouteClassesSm : this.inactiveRouteClassesSm;
    }
    return this.isActiveRoute(route) ? this.activeRouteClasses : this.inactiveRouteClasses;
  }

  public navigateTo(route: string): void {
    this.navigationService.navigateByUrl(route)
      .finally(() => {
        if (this._isOpenMenu) {
          this.toggleMenu();
        }
      });
  }

  public logout(): void {
    this.authService.logout();
  }

  public toggleMenu(): void {
    if (this._mobileScreen) {
      this._isOpenMenu = !this._isOpenMenu;
    }
  }

  private enableClickListener(): void {
    this.renderer.listen('window', 'click', (e: Event): void => {
      if (this.userButton.nativeElement.contains(e.target) || this._isOpenUserMenu) {
        this.toggleUserMenu();
      }
      if (!this.menu?.nativeElement.contains(e.target) && this.menuButton?.nativeElement.contains(e.target)) {
        this.toggleMenu();
      }
    });
  }

  public isActiveRoute(route: string): boolean {
    return this.router.url === route;
  }

  private toggleUserMenu(): void {
    this._isOpenUserMenu = !this._isOpenUserMenu;
  }

  public ngOnDestroy(): void {
    this.unsubscribeAll();
  }

  private startSubscriptions(): void {
    this._subscriptions.push(this.screenSizeService.screenWidth$.asObservable().subscribe({
        next: (value): boolean => this._mobileScreen = value < 640
      })
    )
  }

  private unsubscribeAll(): void {
    this._subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

}
