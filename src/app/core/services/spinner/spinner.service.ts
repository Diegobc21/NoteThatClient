import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private spinnerVisible: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  show(): void {
    this.spinnerVisible.next(true);
  }

  hide(): void {
    setTimeout(() => this.spinnerVisible.next(false), 800)

  }

  public get spinnerVisible$(): Observable<boolean> {
    return this.spinnerVisible.asObservable();
  }
}
