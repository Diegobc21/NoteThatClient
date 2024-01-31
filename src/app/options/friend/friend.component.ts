import {Component, ElementRef, HostListener, OnDestroy, ViewChild} from '@angular/core';
import {Subject, Subscription, takeUntil} from "rxjs";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {User} from "../../interfaces/user.interface";
import {AlertType} from "../../shared/alert/alert-type";
import {SpinnerService} from "../../core/services/spinner/spinner.service";
import {AuthService} from "../../core/services/auth/auth.service";
import {UserService} from "../../core/services/user/user.service";
import {NavigationService} from "../../core/services/navigation/navigation.service";

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss'],
  animations: [
    trigger('slideDown', [
      state('hidden', style({height: '0', opacity: '0', overflow: 'hidden'})),
      state('visible', style({height: '*', opacity: '1', overflow: 'hidden'})),
      transition('hidden <=> visible', animate('200ms ease-in-out')),
    ]),
  ],
})
export class FriendComponent implements OnDestroy {

  @ViewChild('searchInput') public searchInput!: ElementRef;

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

  public goToHome(): void {
    this.navigationService.navigateToHome().then();
  }

  public goToSearchFriends(): void {
    this.navigationService.navigateToFriendsSearch().then();
  }

  public modalClosed(): void {
    this.showAlert = false;
  }

  public deleteFriend(user: User): void {
    console.log('deleted ' + user.fullname)
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
