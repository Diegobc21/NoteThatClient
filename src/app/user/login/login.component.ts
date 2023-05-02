import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import AlertType from "../../shared/alert/alert-type";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  protected readonly AlertType = AlertType;
  public showAlert: boolean = false;

  public form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
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

  public login(event: SubmitEvent): void {
    event.preventDefault();

    this.showAlert = this.form.invalid;
  }

  public removeAlert(): void {
    this.showAlert = false;
  }

  public modalClosed(isClosed: boolean): void {
    this.showAlert = !isClosed;
  }

}
