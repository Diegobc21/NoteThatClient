import {Component, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertType} from "../../shared/alert/alert-type";
import {AuthService} from "../../core/services/auth.service";
import {NavigationService} from "../../core/services/navigation.service";
import {UserService} from "../../core/services/user.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {

  public form: FormGroup;
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
    this.form = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email,
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]]
    })
  }

  public login(event: SubmitEvent | MouseEvent): void {
    event.preventDefault();

    this.showAlert = this.form.invalid;

    if (!this.form.invalid) {
      this._subscriptions.push(
        this.authService.login(this.form.value).subscribe({
          next: () => this.navigationService.navigateToHome().then(),
          error: (): void => {
            this.form.reset();
            this.enableAlert();
          }
        }))
    } else {
      this.form.reset();
      this.enableAlert();
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

  public ngOnDestroy(): void {
    this._subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  private enableAlert(): void {
    this.errorMessage = 'Datos incorrectos';
    this.showAlert = true;
  }
}
