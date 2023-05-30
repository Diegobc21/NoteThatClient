import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../core/services/user.service";
import {User} from "../../interfaces/user.interface";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  public fullName: string = '';
  public email: string = '';

  private subs: Subscription[] = [];

  constructor(
    private userService: UserService
  ) {
  }

  public ngOnInit(): void {
    this.subs.push(
      this.userService.getUserByEmail().subscribe((user: User) => {
          this.fullName = user.fullname;
          this.email = user.email;
        }, (err): void => {
          console.log(err)
        }
      ))
  }

  public ngOnDestroy(): void {
    this.subs.forEach((sub: Subscription): void => sub.unsubscribe());
  }
}
