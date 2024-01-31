import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../interfaces/user.interface";
import {Subscription} from "rxjs";
import {optionList} from "../../options/option-list";
import {UserService} from "../../core/services/user/user.service";
import {NavigationService} from "../../core/services/navigation/navigation.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  public fullName: string = '';

  private subs: Subscription[] = [];

  constructor(
    private userService: UserService,
    private navigationService: NavigationService
  ) {
  }

  get optionList(): any[] {
    return optionList;
  }

  public goToOption(option: string): void {
    this.navigationService.navigateByUrl(option).then();
  }

  public ngOnInit(): void {
    this.subs.push(
      this.userService.getUser().subscribe({
        next: (user: User) => this.fullName = user.fullname
      })
    )
  }

  public navigateToProfile(): void {
    this.navigationService.navigateToProfile().then();
  }

  public ngOnDestroy(): void {
    this.subs.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

}
