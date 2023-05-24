import {Component, OnInit} from '@angular/core';
import {UserService} from "../../core/services/user.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public fullName: string = '';

  constructor(private userService: UserService) {
  }

  public ngOnInit(): void {
    this.fullName = this.userService.fullName;
  }
}
