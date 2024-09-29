import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-subscribe-helper',
  standalone: true,
  imports: [],
  templateUrl: './subscribe-helper.component.html',
  styleUrl: './subscribe-helper.component.scss',
})
export class SubscribeHelperComponent implements OnDestroy {
  private subscriptions: Subscription[];

  constructor() {
    this.subscriptions = [];
  }

  public subscribe<T>(
    observable: Observable<T>,
    next: (response: T) => void,
    complete?: () => void,
    error?: (err: any) => void
  ) {
    this.subscriptions.push(
      observable.subscribe({
        next: (response: T) => {
          if (next) {
            next(response);
          }
        },
        complete: () => {
          if (complete) {
            complete();
          }
        },
        error: (err: any) => {
          if (error) {
            console.error(err)
            error(err);
          }
        },
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
