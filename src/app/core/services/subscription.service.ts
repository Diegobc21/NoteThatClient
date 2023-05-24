import {Injectable} from '@angular/core';
import {Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  private _subscriptions: Subscription[];

  constructor() {
    this._subscriptions = [];
  }

  public add(subscription: Subscription): void {
    this._subscriptions.push(subscription);
  }

  public unsubscribeAll(): void {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
