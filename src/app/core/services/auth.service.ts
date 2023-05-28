import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {User} from "../../interfaces/user.interface";
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private endpoint: string = environment.apiUrl + `/user`;


  constructor(
    private http: HttpClient
  ) {
  }

  public getLoginToken(): string | null {
    return localStorage.getItem('token');
  }

  public isLoggedIn(): boolean {
    return this.getLoginToken() !== '' && this.getLoginToken() !== null;
  }

  public register(user: User): Observable<User> {
    user.password = this.encrypt(user.password);
    return this.http.post<User>(this.endpoint + '/register', user);
  }

  public login(user: User): Observable<User> {
    user.password = this.encrypt(user.password);
    return this.http.post<User>(this.endpoint + '/login', user)
      .pipe(tap((response: User): void => {
        const sessionToken: string | undefined = response.actualToken;
        if (sessionToken) {
          localStorage.setItem('token', sessionToken);
          localStorage.setItem('email', response.email);
        }
      }));
  }

  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  }

  private encrypt(input: string): string {
    return CryptoJS.SHA256(input).toString();
  }
}
