import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { NavigationService } from '../../core/services/navigation.service';
import { User } from '../../interfaces/user.interface';
import { AlertType } from '../../shared/alert/alert-type';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {

  public form: User = {
    fullname: '',
    email: '',
    password: '',
  };
  public showAlert: boolean = false;
  public errorMessage: string = '';

  private _subscriptions: Subscription[] = [];

  protected readonly AlertType = AlertType;

  constructor(
    private authService: AuthService,
    private navigationService: NavigationService
  ) {
    if (this.authService.isLoggedIn()) {
      this.navigationService.navigateToHome().then();
    }
  }

  public removeAlert(event: KeyboardEvent): void {
    if (event.key !== 'Enter') {
      event.preventDefault();
      this.showAlert = false;
    }
  }

  public modalClosed(isClosed: boolean): void {
    this.showAlert = !isClosed;
  }

  public navigateToRegister(): void {
    this.navigationService.navigateToRegister().then();
  }

  public login(event: SubmitEvent | MouseEvent): void {
    event.preventDefault();

    this.showAlert = this.formInvalid();

    if (!this.formInvalid()) {
      this._subscriptions.push(
        this.authService
          .login({
            email: this.form.email,
            password: this.form.password,
          } as User)
          .subscribe({
            next: () => this.navigationService.navigateToHome().then(),
            error: (err): void => {
              if (err?.message.includes('0 Unknown Error')) {
                this.setMessageAsSystemError();
              } else {
                this.setMessageAsAuthError();
              }
              this.resetForm();
              this.enableAlert();
            },
          })
      );
    } else {
      this.resetForm();
      this.enableAlert();
    }
  }

  private resetForm(): void {
    this.form = {
      fullname: '',
      email: '',
      password: '',
    };
  }

  private formInvalid(): boolean {
    return this.form.email === '' || this.form.password.length < 5;
  }

  public ngOnDestroy(): void {
    this._subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe()
    );
  }

  private setMessageAsSystemError(): void {
    this.errorMessage = 'Fallo de sistema';
  }

  private setMessageAsAuthError(): void {
    this.errorMessage = 'Datos incorrectos';
  }

  private enableAlert(): void {
    this.showAlert = true;
  }
}
