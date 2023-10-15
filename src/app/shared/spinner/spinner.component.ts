import {Component} from '@angular/core';
import {SpinnerService} from "../../core/services/spinner.service";
import {Observable} from "rxjs";
import {AuthService} from "../../core/services/auth.service";

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  constructor(private spinnerService: SpinnerService,
              private authService: AuthService) {
  }

  getLoggedIn(): boolean {
    return this.authService.isLoggedIn()
  }

  get spinnerVisible(): Observable<boolean> {
    return this.spinnerService.getSpinnerVisibility();
  }
}
