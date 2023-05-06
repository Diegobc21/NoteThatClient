import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {User} from "../shared/interfaces/user.interface";
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
    console.log(user)
    return this.http.post<User>(this.endpoint + '/login', user)
      .pipe(tap((response: User) => {
        if (response.actualToken) {
          localStorage.setItem('token', response.actualToken);
          localStorage.setItem('user', JSON.stringify(response));
        }
      }));
  }

  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  public isAdmin(): boolean {
    const user: User | undefined = this.currentUser;
    return !!user?.admin;
  }

  private encrypt(input: string): string {
    return CryptoJS.SHA256(input).toString();
  }
}
