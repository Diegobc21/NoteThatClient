import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../interfaces/user.interface';
import {Subscription} from 'rxjs';
import {UserService} from "../../core/services/user/user.service";
import {ClipboardService} from "../../core/services/clipboard/clipboard.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  public fullName: string = '';
  public email: string = '';
  public icon: string = 'mail';

  private subs: Subscription[] = [];

  constructor(
    private userService: UserService,
    private clipboardService: ClipboardService
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

  public copyToClipboard(text: string): void {
    if (this.clipboardService.copyToClipboard(text)) {
      this.icon = 'check'
      setTimeout(() => {
        this.getSvg('mail');
      }, 1500)
    }
  }

  public getSvg(type: string): void {
    this.icon = type;
  }

  public ngOnDestroy(): void {
    this.subs.forEach((subscription: Subscription): void =>
      subscription.unsubscribe()
    );
  }
}
