import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import AlertType from "../../shared/alert/alert.component";
import {AuthService} from "../../core/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  public showAlert: boolean = false;

  public form: FormGroup = this.formBuilder.group({
    name: ['', [
      Validators.required
    ]],
    email: ['', [
      Validators.required,
      Validators.email
    ]],
    password: ['', [
      Validators.required,
      Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/),
      Validators.minLength(6)
    ]],
    repeatPassword: ['', [
      Validators.required,
      Validators.minLength(6)
    ]]
  })

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService
  ) {
  }

  public register(event: MouseEvent | SubmitEvent): void {
    event.preventDefault();

    this.showAlert = this.form.invalid;
    if (!this.showAlert) {
      this.authService.register('body');
    }
  }

  public removeAlert(event: KeyboardEvent): void {
    this.showAlert = false;
  }

  public modalClosed(isClosed: boolean): void {
    this.showAlert = !isClosed;
  }

  // resetPasswordForm = this.formBuilder.group(
  //   {
  //     password: this.form.value('password'),
  //     confirmPassword: this.form.value('repeatPassword')
  //   },
  //   {
  //     validator: this.confirmedValidator('password', 'confirmPassword')
  //   }
  // );

  onSubmit(): void {
    // console.log(this.resetPasswordForm);
    // if (!this.resetPasswordForm?.valid) {
    //   return;
    // }
  }

  confirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors
        // && !matchingControl.errors.confirmedValidator
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({confirmedValidator: true});
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  protected readonly AlertType = AlertType;
}
