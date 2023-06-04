import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../core/services/user.service";
import {NavigationService} from "../../core/services/navigation.service";
import {User} from "../../interfaces/user.interface";
import {Subscription} from "rxjs";
import {OptionType} from "../../options/optionType.enum";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  public fullName: string = '';

  private subs: Subscription[] = [];
  protected readonly OptionType = OptionType;

  constructor(
    private userService: UserService,
    private navigationService: NavigationService
  ) {
  }

  public goToOption(option: OptionType): void {
    this.navigationService.navigateToOption(option).then();
  }

  public ngOnInit(): void {
    this.subs.push(
      this.userService.getUserByEmail().subscribe({
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
