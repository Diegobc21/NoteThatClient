import {Injectable, OnDestroy} from '@angular/core';
import {Observable, ReplaySubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeService implements OnDestroy {

  public screenWidth$: Observable<number> = new Observable();
  public screenHeight$: Observable<number> = new Observable();

  private screenWidth: Subject<number> = new ReplaySubject<number>();
  private screenHeight: Subject<number> = new ReplaySubject<number>();

  constructor() {
    this.screenWidth$ = this.screenWidth.asObservable();
    this.screenHeight$ = this.screenHeight.asObservable();
    window.addEventListener('resize', this.init.bind(this));
  }

  private init(event: Event): void {
    this._setScreenWidth(event);
    this._setScreenHeight(event);
  }

  private _setScreenWidth(event: Event): void {
    this.screenWidth.next(window.innerWidth);
  }

  private _setScreenHeight(event: Event): void {
    this.screenWidth.next(window.innerHeight);
  }

  public ngOnDestroy(): void {
    window.removeEventListener('resize', this._setScreenWidth.bind(this));
  }
}
