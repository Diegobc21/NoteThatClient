import {Component, ElementRef, OnDestroy, Renderer2, ViewChild} from '@angular/core';
import {ScreenSizeService} from "../../core/screen-size.service";
import {SubscriptionService} from "../../core/subscription.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnDestroy {
  @ViewChild('menuButton') private menuButton: ElementRef | undefined;
  @ViewChild('userButton') private userButton!: ElementRef;
  @ViewChild('menu') private menu: ElementRef | undefined;

  private _isOpenUserMenu: boolean;
  private _isOpenMenu: boolean;
  private _mobileScreen!: boolean;

  constructor(private renderer: Renderer2,
              private screenSizeService: ScreenSizeService,
              private subscriptionService: SubscriptionService) {
    this._isOpenUserMenu = false;
    this._isOpenMenu = false;
    this.startSubscriptions();
    this.enableClickListener();
  }

  get isOpenUserMenu(): boolean {
    return this._isOpenUserMenu;
  }

  get showMobileMenu(): boolean {
    return this._isOpenMenu;
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

  private toggleUserMenu(): void {
    this._isOpenUserMenu = !this._isOpenUserMenu;
  }

  private toggleMenu(): void {
    this._isOpenMenu = !this._isOpenMenu;
  }

  public ngOnDestroy(): void {
    this.subscriptionService.unsubscribeAll()
  }

  private startSubscriptions() {
    this.subscriptionService.add(
      this.screenSizeService.screenWidth$.asObservable().subscribe(value => {
        this._mobileScreen = value < 640;
      })
    );
  }
}
