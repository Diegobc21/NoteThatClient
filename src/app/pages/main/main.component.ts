import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../core/auth.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
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
