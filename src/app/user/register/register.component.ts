import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { NavigationService } from '../../core/services/navigation.service';
import { User } from '../../interfaces/user.interface';
import { AlertType } from '../../shared/alert/alert-type';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnDestroy {
  public form: User = {
    fullname: '',
    email: '',
    password: '',
  };
  public repeatPassword = '';

  public showAlert: boolean = false;
  public errorMessage: string = '';

  private subscriptions: Subscription[] = [];

  protected readonly AlertType = AlertType;

  constructor(
    private authService: AuthService,
    private navigationService: NavigationService
  ) {
    if (this.authService.isLoggedIn()) {
      this.navigationService.navigateToHome().then();
    }
  }

  public register(event: SubmitEvent | MouseEvent): void {
    event.preventDefault();

    if (this.form.password !== this.repeatPassword) {
      this.setMessageAsNotMatchingPasswords();
      this.enableAlert();
    } else {
      this.showAlert = this.formInvalid();
      if (!this.formInvalid()) {
        this.subscriptions.push(
          this.authService.register(this.form).subscribe({
            next: () => this.navigationService.navigateToLogin().then(),
            error: (err): void => {
              if (err?.message.includes('0 Unknown Error')) {
                this.setMessageAsSystemError();
              } else {
                this.setMessageAsAuthError();
              }
              this.enableAlert();
            }})
        );
      }
    }
  }

  private formInvalid(): boolean {
    return (
      this.form.fullname === '' ||
      this.form.email === '' ||
      this.form.password.length < 5
    );
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

  public navigateToLogin(): void {
    this.navigationService.navigateToLogin().then();
  }

  private setMessageAsSystemError(): void {
    this.errorMessage = 'Fallo de sistema';
  }

  private setMessageAsAuthError(): void {
    this.errorMessage = 'Revisa los campos';
  }

  private setMessageAsNotMatchingPasswords(): void {
    this.errorMessage = 'Las contraseñas no coinciden';
  }

  private enableAlert(): void {
    this.showAlert = true;
  }

  public ngOnDestroy() {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }
}
