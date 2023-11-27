import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, debounceTime, fromEvent, Subject, takeUntil} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeService implements OnDestroy {

  public screenWidth$: BehaviorSubject<number> = new BehaviorSubject(0);
  public screenHeight$: BehaviorSubject<number> = new BehaviorSubject(0);

  private _unsubscriber$: Subject<any> = new Subject();

  constructor() {
    this.init();
  }


  public ngOnDestroy(): void {
    this._unsubscriber$.next(null);
    this._unsubscriber$.complete();
  }

  private init(): void {
    this._setScreenWidth(window.innerWidth);
    this._setScreenHeight(window.innerHeight);
    fromEvent(window, 'resize')
      .pipe(
        debounceTime(1000),
        takeUntil(this._unsubscriber$)
      )
      .subscribe({
        next: (event: any) => {
          this._setScreenWidth(event.target.innerWidth)
          this._setScreenHeight(event.target.innerHeight)
        }
      });
  }

  private _setScreenWidth(width: number): void {
    this.screenHeight$.next(width);
  }

  private _setScreenHeight(height: number): void {
    this.screenHeight$.next(height);
  }

}
