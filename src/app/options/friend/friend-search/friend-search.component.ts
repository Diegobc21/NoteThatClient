import {Component, OnDestroy} from '@angular/core';
import {Subject, Subscription, takeUntil} from "rxjs";
import {User} from "../../../interfaces/user.interface";
import {AlertType} from "../../../shared/alert/alert-type";
import {SpinnerService} from "../../../core/services/spinner/spinner.service";
import {AuthService} from "../../../core/services/auth/auth.service";
import {UserService} from "../../../core/services/user/user.service";
import {NavigationService} from "../../../core/services/navigation/navigation.service";

@Component({
  selector: 'app-friend-search',
  templateUrl: './friend-search.component.html',
  styleUrls: ['./friend-search.component.scss']
})
export class FriendSearchComponent implements OnDestroy {

  private unsubscribe$: Subject<void> = new Subject<void>();
  private _userList: User[] = [];
  private subscriptions: Subscription[] = [];
  private _showAlert: boolean = true;

  constructor(
    public spinnerService: SpinnerService,
    private authService: AuthService,
    private userService: UserService,
    private navigationService: NavigationService
  ) {
    this.startSubscriptions();
    this.updateAlertVisibility();
  }

  get userList(): User[] {
    return this._userList;
  }

  get showAlert() {
    return this._showAlert;
  }

  set showAlert(value: boolean) {
    this._showAlert = value;
  }

  public goToFriends(): void {
    this.navigationService.navigateToFriends().then();
  }

  public modalClosed(): void {
    this.showAlert = false;
  }


  public sendFriendRequest(user: User): void {
    console.log('sent')
  }

  public ngOnDestroy(): void {
    this.stopSubscriptions();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private updateAlertVisibility(): void {
    this.showAlert = this._userList.length === 0;
  }

  private startSubscriptions(): void {
    this.subscriptions.push(
      this.userService.getAllUsers().pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (users: User[]): void => {
            this._userList = users ?? [];
            this.updateAlertVisibility();
          }
        })
    )
  }

  private stopSubscriptions(): void {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }

  protected readonly AlertType = AlertType;
}
