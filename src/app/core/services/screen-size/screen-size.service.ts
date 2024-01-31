import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, debounceTime, fromEvent, Observable, Subject, takeUntil} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeService implements OnDestroy {

  public screenWidth: BehaviorSubject<number> = new BehaviorSubject(0);
  public screenHeight: BehaviorSubject<number> = new BehaviorSubject(0);


  private _unsubscriber$: Subject<any> = new Subject();

  constructor() {
    this.init();
  }

  private init(): void {
    this._setScreenWidth(window.innerWidth);
    this._setScreenHeight(window.innerHeight);
    window.addEventListener('resize', this.handleResize.bind(this));
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

  private handleResize(event: Event): void {
    this.screenWidth.next(window.innerWidth);
  }

  private _setScreenWidth(width: number): void {
    this.screenHeight.next(width);
  }

  private _setScreenHeight(height: number): void {
    this.screenHeight.next(height);
  }

  public ngOnDestroy(): void {
    window.removeEventListener('resize', this.handleResize.bind(this));
    this._unsubscriber$.next(null);
    this._unsubscriber$.complete();
  }
}
