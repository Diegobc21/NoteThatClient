import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  public showSpinner: boolean = false;

  constructor() {
    // empty
  }

  public hide() {
    this.showSpinner = false;
  }

  public show() {
    this.showSpinner = true;
  }
}
