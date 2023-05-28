import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../core/services/user.service";
import {NavigationService} from "../../core/services/navigation.service";
import {User} from "../../interfaces/user.interface";
import {Subscription} from "rxjs";

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

  public ngOnInit(): void {
    this.subs.push(
      this.userService.getUserByEmail().subscribe((user: User) => {
        this.fullName = user.fullname;
      })
    )
  }

  public navigateToProfile(): void {
    this.navigationService.navigateToProfile().then();
  }


  public ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
