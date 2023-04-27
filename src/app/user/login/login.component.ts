import {Component} from '@angular/core';
import AlertType from "../../shared/alert/alert.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public showAlert: boolean = false;

  public form: FormGroup = this.formBuilder.group({
    email: ['', [
      Validators.required,
      Validators.email,
    ]],
    password: ['', [
      Validators.required,
      Validators.minLength(6)
    ]]
  })

  constructor(private formBuilder: FormBuilder) {
  }

  public login(event: MouseEvent | SubmitEvent): void {
    event.preventDefault();

    this.showAlert = this.form.invalid;
  }

  public removeAlert(event: KeyboardEvent): void {
    this.showAlert = false;
  }

  public modalClosed(isClosed: boolean): void {
    this.showAlert = !isClosed;
  }

  protected readonly AlertType = AlertType;
}
