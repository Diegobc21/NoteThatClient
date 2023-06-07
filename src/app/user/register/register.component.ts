import {Component, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../core/services/auth.service";
import {NavigationService} from "../../core/services/navigation.service";
import {AlertType} from "../../shared/alert/alert-type";
import {Subscription} from "rxjs";
import {User} from "../../interfaces/user.interface";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnDestroy {

  public form: User = {
    fullname: '',
    email: '',
    password: ''
  };

  public repeatPassword = '';

  public showAlert: boolean = false;
  public errorMessage: string = '';

  private subscriptions: Subscription[] = [];

  protected readonly AlertType = AlertType;

  constructor(
    private formBuilder: FormBuilder,
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
      this.showAlert = true;
      this.errorMessage = 'Las contraseñas no coinciden';
    } else {
      this.showAlert = this.formInvalid();
      if (!this.formInvalid()) {
        this.subscriptions.push(
          this.authService.register(
            this.form
          ).subscribe({
            next: () => this.navigationService.navigateToLogin().then(),
            error: () => this.enableAlert()
          })
        )
      }
    }
  }

  private formInvalid(): boolean {
    return this.form.fullname === ''
      || this.form.email === '' || this.form.password.length < 5;
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

  public ngOnDestroy() {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }

  private enableAlert(): void {
    this.errorMessage = 'Revisa los campos';
    this.showAlert = true;
  }
}
