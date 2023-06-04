import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  public showSpinner: boolean = false;


  public hide(): void {
    this.showSpinner = false
  }

  public show(): void {
    this.showSpinner = true;
  }
}
