import {Component, OnDestroy} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AlertType} from "../../shared/alert/alert-type";
import {AuthService} from "../../core/services/auth.service";
import {NavigationService} from "../../core/services/navigation.service";
import {UserService} from "../../core/services/user.service";
import {Subscription} from "rxjs";
import {User} from "../../interfaces/user.interface";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {

  public form: User = {
    fullname: '',
    email: '',
    password: ''
  };

  public showAlert: boolean = false;
  public errorMessage: string = '';

  private _subscriptions: Subscription[] = [];

  protected readonly AlertType = AlertType;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private navigationService: NavigationService
  ) {
    if (this.authService.isLoggedIn()) {
      this.navigationService.navigateToHome().then();
    }
  }

  private formInvalid(): boolean {
    return this.form.email === '' || this.form.password.length < 5;
  }

  public login(event: SubmitEvent | MouseEvent): void {
    event.preventDefault();

    this.showAlert = this.formInvalid();

    if (!this.formInvalid()) {
      this._subscriptions.push(
        this.authService.login(
          {
            email: this.form.email,
            password: this.form.password
          } as User)
          .subscribe({
            next: () => this.navigationService.navigateToHome().then(),
            error: (): void => {
              this.resetForm();
              this.enableAlert();
            }
          }))
    } else {
      this.resetForm();
      this.enableAlert();
    }
  }

  private resetForm(): void {
    this.form = {
      fullname: '',
      email: '',
      password: ''
    };
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

  public ngOnDestroy(): void {
    this._subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  private enableAlert(): void {
    this.errorMessage = 'Datos incorrectos';
    this.showAlert = true;
  }
}
