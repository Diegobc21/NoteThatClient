import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import {SpinnerService} from "../../core/services/spinner/spinner.service";
import {AuthService} from "../../core/services/auth/auth.service";

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
  @Input() size: number = 20;

  constructor(
    private spinnerService: SpinnerService,
    private authService: AuthService
  ) {}

  public get spinnerVisible(): Observable<boolean> {
    return this.spinnerService.spinnerVisible$;
  }

  public getSize(): string {
    return `${this.size}px`;
  }

  public getLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
