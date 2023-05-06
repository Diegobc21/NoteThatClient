import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../core/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private _fullName: string = '';

  get fullName(): string {
    return this._fullName;
  }

  constructor(private authService: AuthService) {
  }

  public ngOnInit(): void {
    this._fullName = this.authService.currentUser?.fullname ?? 'User';
  }
}
