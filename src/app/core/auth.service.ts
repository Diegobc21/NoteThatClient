import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn: boolean = false;

  public isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
