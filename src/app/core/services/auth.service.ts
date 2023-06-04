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

  public sessionExpired: boolean = false;
  private endpoint: string = environment.apiUrl + `/user`;

  constructor(
    private http: HttpClient
  ) {
  }

  public isLoggedIn(): boolean {
    return this.getLoginToken() !== ''
      && this.getLoginToken() !== null;
  }

  public register(user: User): Observable<User> {
    user.password = this.encrypt(user.password);
    return this.http.post<User>(this.endpoint + '/register', user);
  }

  public login(user: User): Observable<any> {
    user.password = this.encrypt(user.password);
    return this.http.post<User>(this.endpoint + '/login', user)
      .pipe(
        tap((response: any): void => {
          const sessionToken: string | undefined = response.token;
          this.sessionExpired = false;
          localStorage.setItem('token', sessionToken ?? '');
          localStorage.setItem('email', response.email ?? '');
        })
      );
  }

  public logout(): Observable<void> {
    const email: string = localStorage.getItem('email') ?? '';
    return this.http.post<void>(this.endpoint + '/logout', {email})
      .pipe(
        tap((): void => {
          localStorage.removeItem('token');
          localStorage.removeItem('email');
        })
      );
  }

  private getLoginToken(): string | null {
    return localStorage.getItem('token');
  }

  private encrypt(input: string): string {
    return CryptoJS.SHA256(input).toString();
  }
}
