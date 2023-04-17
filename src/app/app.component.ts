import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  public title: string = 'Proyecto';
  public show: boolean = false;
  currentUrl: string = '';

  constructor(
    private router: Router
  ) {
  }

  public ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.currentUrl = this.router.routerState.snapshot.url;
        this.show = this.currentUrl !== '/user/register' && this.currentUrl !== '/user/login'
      });
  }

}
