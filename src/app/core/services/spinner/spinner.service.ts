import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private spinnerVisible = new BehaviorSubject<boolean>(false);
  // public showSpinner: boolean = false;

  // public hide(): void {
  //   this.showSpinner = false;
  // }

  // public show(): void {
  //   this.showSpinner = true;
  // }

  show2(): void {
    this.spinnerVisible.next(true);
  }

  hideSpinner() {
    this.spinnerVisible.next(false);
  }

  getSpinnerVisibility() {
    return this.spinnerVisible.asObservable();
  }
}
