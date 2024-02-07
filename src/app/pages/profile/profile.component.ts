import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../interfaces/user.interface';
import {Observable, Subscription} from 'rxjs';
import {UserService} from "../../core/services/user/user.service";
import {SpinnerService} from "../../core/services/spinner/spinner.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  public fullName: string = '';
  public email: string = '';

  private subs: Subscription[] = [];

  constructor(
    private userService: UserService,
    private spinnerService: SpinnerService
  ) {
  }

  public ngOnInit(): void {
    this.subs.push(
      this.userService.getUser().subscribe({
        next: (user: User): void => {
          this.fullName = user.fullname;
          this.email = user.email;
        },
        error: (err) => console.log(err),
      })
    );
  }

  public get showSpinner(): Observable<boolean> {
    return this.spinnerService.spinnerVisible$;
  }

  public ngOnDestroy(): void {
    this.subs.forEach((subscription: Subscription): void =>
      subscription.unsubscribe()
    );
  }
}
