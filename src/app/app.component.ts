import {Component, HostBinding, HostListener, Injector, TemplateRef} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter, Observable} from 'rxjs';
import {DarkModeService} from './core/services/dark-mode/dark-mode.service';
import {MediaCheckService} from './core/services/media-check/media-check.service';
import {SharedHelperComponent} from "./utils/shared-helper/shared-helper.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends SharedHelperComponent {
  @HostListener('click', ['${event}'])
  public onClick(): void {
    this.mediaCheckService.emitClick();
  }

  @HostBinding('class.dark') get mode() {
    return this.darkModeService.darkMode();
  }

  public overlayTemplate: TemplateRef<any> | null = null;

  public title: string = 'NoteThat';
  public showNavbar: boolean = false;

  public showOverlay$ = this.overlayService.showOverlay$;
  public disableAcceptButton$ = this.overlayService.disableAcceptButton$;
  public useCancelButton$ = this.overlayService.useCancelButton$;
  public useActionButton$ = this.overlayService.useActionButton$;

  private currentUrlPath: string = '';

  constructor(
    injector: Injector,
    private router: Router,
    private mediaCheckService: MediaCheckService,
    private darkModeService: DarkModeService
  ) {
    super(injector);
    this.overlayService.overlayConfig$.subscribe(config => {
      this.overlayTemplate = config?.template ?? null;
    });
    this.subscribe(
      this.router.events?.pipe(filter((event) => event instanceof NavigationEnd)),
      () => {
        this.currentUrlPath = this.router.routerState.snapshot.url;
        this.showNavbar =
          this.currentUrlPath !== '/user/register' &&
          this.currentUrlPath !== '/user/login';
      }
    );
  }
}
