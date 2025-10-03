import {Component, Injector, OnDestroy} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {OverlayConfig, OverlayService} from "../../core/services/overlay/overlay.service";

@Component({
  selector: 'app-shared-helper',
  standalone: true,
  imports: [],
  templateUrl: './shared-helper.component.html',
  styleUrl: './shared-helper.component.scss',
})
export class SharedHelperComponent implements OnDestroy {
  public overlayService: OverlayService;

  private subscriptions: Subscription[] = [];

  constructor(injector: Injector) {
    this.overlayService = injector.get(OverlayService);
  }

  public showOverlay(config: OverlayConfig): void {
    if (!config) return;
    this.overlayService.show(config);
  }

  public hideOverlay(): void {
    this.overlayService.hide();
  }

  public acceptOverlay(): void {
    this.overlayService.accept();
  }

  public subscribe(
    observable: Observable<any>,
    next: (response: any) => void,
    complete?: () => void,
    error?: (err: any) => void
  ) {
    this.subscriptions.push(
      observable.subscribe({
        next: (response: any) => {
          if (next) {
            next(response);
          }
        },
        complete: () => {
          if (complete) {
            complete();
          }
        },
        error: (err: any) => {
          if (error) {
            console.error(err)
            error(err);
          }
        },
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
