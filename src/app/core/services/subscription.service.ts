import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  private subscriptionSubject = new Subject<Subscription>();

  subscribe(subscription: Subscription): void {
    this.subscriptionSubject.next(subscription);
  }

  unsubscribe(subscription: Subscription): void {
    subscription.unsubscribe();
  }

  clearSubscriptions(signal: any = null): void {
    this.subscriptionSubject.next(signal);
  }

  getSubscriptionSubject(): Observable<Subscription> {
    return this.subscriptionSubject.asObservable();
  }
}
