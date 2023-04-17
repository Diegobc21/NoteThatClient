import {Component} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public showAlert: boolean = true;
  public form: FormGroup = new FormGroup({});
  public email!: Event;
  public password!: Event;

  public login(event: MouseEvent | SubmitEvent): void {
    event.preventDefault();

    console.log(event)
  }

  public modalClosed(isClosed: boolean): void {
    this.showAlert = !isClosed;
  }

}
