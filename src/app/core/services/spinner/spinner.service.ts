import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private spinnerVisible: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public get spinnerVisible$(): Observable<boolean> {
    return this.spinnerVisible.asObservable();
  }

  show(): void {
    this.spinnerVisible.next(true);
  }

  hide(): void {
    this.spinnerVisible.next(false);
  }
}
