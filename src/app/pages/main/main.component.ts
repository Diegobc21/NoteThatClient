import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../core/services/user.service";
import {NavigationService} from "../../core/services/navigation.service";
import {User} from "../../interfaces/user.interface";
import {Subscription} from "rxjs";
import {OptionType} from "../../options/optionType.enum";
import {OPTION_LIST} from "../../options/option-list";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  public fullName: string = '';

  protected readonly OPTION_LIST: any[] = OPTION_LIST;

  private subs: Subscription[] = [];

  constructor(
    private userService: UserService,
    private navigationService: NavigationService
  ) {
  }

  get optionList(): any[] {
    return OPTION_LIST.filter(option => option.type !== OptionType.Home);
  }

  public goToOption(option: OptionType): void {
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
