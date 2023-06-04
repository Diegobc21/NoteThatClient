import {Component, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../core/services/auth.service";
import {NavigationService} from "../../core/services/navigation.service";
import {AlertType} from "../../shared/alert/alert-type";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnDestroy {

  public form: FormGroup;
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
    this.form = this.formBuilder.group({
      fullname: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        // Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/),
        Validators.minLength(6)
      ]],
      repeatPassword: ['', [
        Validators.required,
        Validators.minLength(6)
      ]]
    })
  }

  public register(event: SubmitEvent | MouseEvent): void {
    event.preventDefault();

    if (this.form.value.password !== this.form.value.repeatPassword) {
      this.showAlert = true;
      this.errorMessage = 'Las contraseñas no coinciden';
    } else {
      this.showAlert = this.form.invalid;
      if (!this.form.invalid) {
        this.subscriptions.push(
          this.authService.register(this.form.value).subscribe({
            next: () => this.navigationService.navigateToLogin().then(),
            error: () => this.enableAlert()
          })
        )
      }
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
