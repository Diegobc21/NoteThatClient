import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertType} from "../../shared/alert/alert-type";
import {SubscriptionService} from "../../core/services/subscription.service";
import {AuthService} from "../../core/services/auth.service";
import {NavigationService} from "../../core/services/navigation.service";
import {UserService} from "../../core/services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public showAlert: boolean = false;
  public form: FormGroup;
  public errorMessage: string = '';

  protected readonly AlertType = AlertType;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private subscriptionService: SubscriptionService,
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
      this.subscriptionService.add(
        this.authService.login(this.form.value).subscribe((user) => {
            this.navigationService.navigateToHome().then();
          }, () => {
            this.form.reset();
            this.enableAlert();
          }
        ));
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

  private enableAlert(): void {
    this.errorMessage = 'Datos incorrectos';
    this.showAlert = true;
  }
}
