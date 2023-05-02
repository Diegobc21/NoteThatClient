import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../core/auth.service";
import {SubscriptionService} from "../../core/subscription.service";
import AlertType from "../../shared/alert/alert-type";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  public form: FormGroup;
  public showAlert: boolean = false;
  public errorMessage: string = '';

  protected readonly AlertType = AlertType;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private subscriptionService: SubscriptionService
  ) {
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

  public register(event: SubmitEvent): void {
    event.preventDefault();

    if (this.form.value.password !== this.form.value.repeatPassword) {
      this.showAlert = true;
      this.errorMessage = 'Las contraseñas no coinciden';
    } else {
      this.showAlert = this.form.invalid;
      this.errorMessage = 'Revisa los campos';
      if (!this.form.invalid) {
        this.subscriptionService.add(
          this.authService.register(this.form.value).subscribe(() => {
              console.log('Done')
            }
          ));
      }
    }
  }

  public removeAlert(): void {
    this.showAlert = false;
  }

  public modalClosed(isClosed: boolean): void {
    this.showAlert = !isClosed;
  }

}
