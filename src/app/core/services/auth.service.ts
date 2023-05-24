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

  get currentUser(): User | undefined {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  constructor(private http: HttpClient) {
  }

  public getLoginToken(): string | null {
    return localStorage.getItem('token');
  }

  public isLoggedIn(): boolean {
    return this.getLoginToken() !== null && this.currentUser?.actualToken === this.getLoginToken();
  }

  public register(user: User): Observable<User> {
    user.password = this.encrypt(user.password);
    return this.http.post<User>(this.endpoint + '/register', user);
  }

  public login(user: User): Observable<User> {
    user.password = this.encrypt(user.password);
    user.actualToken = this.getLoginToken() ?? '';
    return this.http.post<User>(this.endpoint + '/login', user)
      .pipe(tap((response: User) => {
        const actualToken: string | undefined = response.actualToken;
        if (actualToken) {
          localStorage.setItem('token', actualToken);
          localStorage.setItem('user', JSON.stringify(response));
        }
      }));
  }

  public logout(user: User): Observable<User> {
    return this.http.post<User>(this.endpoint + '/logout', user)
      .pipe(tap(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }));
  }

  public isAdmin(): boolean {
    return !!this.currentUser?.admin;
  }

  private encrypt(input: string): string {
    return CryptoJS.SHA256(input).toString();
  }
}
