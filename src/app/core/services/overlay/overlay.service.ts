import {Injectable, TemplateRef} from '@angular/core';
import {BehaviorSubject, isObservable, map, Observable, of, startWith, switchMap} from 'rxjs';

export interface OverlayConfig {
  template: TemplateRef<any>;
  disableAcceptButton?: boolean | Observable<boolean>;
  useCancelButton?: boolean | Observable<boolean>;
  useActionButton?: boolean | Observable<boolean>;
  onAccept?: () => void;
  onHideAction?: () => void;
  onCancel?: () => void;
}

@Injectable({ providedIn: 'root' })
export class OverlayService {
  private showOverlaySubject = new BehaviorSubject<boolean>(false);
  private overlayConfigSubject = new BehaviorSubject<OverlayConfig | null>(null);

  public showOverlay$: Observable<boolean> = this.showOverlaySubject.asObservable();
  public disableAcceptButton$: Observable<boolean> = this.showOverlaySubject.asObservable();
  public useCancelButton$: Observable<boolean> = this.showOverlaySubject.asObservable();
  public useActionButton$: Observable<boolean> = this.showOverlaySubject.asObservable();
  public overlayConfig$ = this.overlayConfigSubject.asObservable();

  constructor() {
    this.disableAcceptButton$= this.overlayConfig$.pipe(
      switchMap(cfg => this.toFlag$(cfg?.disableAcceptButton, false))
    );

    this.useCancelButton$ = this.overlayConfig$.pipe(
      switchMap(cfg => this.toFlag$(cfg?.useCancelButton, true))
    );

    this.useActionButton$= this.overlayConfig$.pipe(
      switchMap(cfg => this.toFlag$(cfg?.useActionButton, true))
    );
  }

  public show(config: OverlayConfig): void {
    this.overlayConfigSubject.next(config);
    this.showOverlaySubject.next(true);
  }

  public hide(): void {
    this.showOverlaySubject.next(false);
    const cfg = this.overlayConfigSubject.value;
    cfg?.onHideAction?.();
    this.overlayConfigSubject.next(null);
  }

  public accept(): void {
    const cfg = this.overlayConfigSubject.value;
    cfg?.onAccept?.();
    this.hide();
  }

  // converts a boolean | Observable<boolean> into Observable<boolean> with fallback
  private toFlag$(flag: boolean | Observable<boolean> | undefined, fallback: boolean): Observable<boolean> {
    if (flag == null) return of(fallback);
    if (isObservable(flag)) return flag.pipe(startWith(fallback));
    return of(flag);
  }

}
