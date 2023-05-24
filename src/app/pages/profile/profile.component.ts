import {Component, OnInit} from '@angular/core';
import {UserService} from "../../core/services/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public fullName: string = '';
  public email: string = '';

  constructor(private userService: UserService) {
  }

  public ngOnInit(): void {
    this.fullName = this.userService.fullName;
    this.email = this.userService.email;
  }
}
