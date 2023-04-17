import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, debounceTime, fromEvent, Subject, takeUntil} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeService implements OnDestroy {

  public screenWidth$: BehaviorSubject<any> = new BehaviorSubject(null);

  private _unsubscriber$: Subject<any> = new Subject();

  constructor() {
    this.init();
  }

  private init(): void {
    this._setScreenWidth(window.innerWidth);
    fromEvent(window, 'resize')
      .pipe(
        debounceTime(1000),
        takeUntil(this._unsubscriber$)
      ).subscribe((event: any) => {
      this._setScreenWidth(event.target.innerWidth);
    });
  }

  public ngOnDestroy() {
    this._unsubscriber$.next(null);
    this._unsubscriber$.complete();
  }

  private _setScreenWidth(width: number): void {
    this.screenWidth$.next(width);
  }

}
