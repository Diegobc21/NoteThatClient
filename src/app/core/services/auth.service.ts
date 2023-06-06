import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, EMPTY, map, Observable, tap} from "rxjs";
import {User} from "../../interfaces/user.interface";
import * as CryptoJS from 'crypto-js';
import {NavigationService} from "./navigation.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public sessionExpired: boolean = false;

  private endpoint: string = environment.apiUrl + `/user`;

  constructor(
    private http: HttpClient,
    private navigatorService: NavigationService
  ) {
  }

  get token(): string {
    return localStorage.getItem('token') ?? '';
  }

  get email(): string {
    return localStorage.getItem('email') ?? '';
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
          this.sessionExpired = false;
          this.saveLocalStorage(response.token, response.email);
        })
      );
  }

  public logout(): Observable<void> {
    return this.http.post<void>(this.endpoint + '/logout', {email: this.email})
      .pipe(
        tap((): void => {
          this.emptyLocalStorage();
        })
      );
  }

  public getHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `${this.token}`);
  }

  private getLoginToken(): string | null {
    return localStorage.getItem('token');
  }

  private saveLocalStorage(token: string, email: string): void {
    localStorage.setItem('token', token ?? '');
    localStorage.setItem('email', email ?? '');
  }

  private emptyLocalStorage(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  }

  public checkConnection(data: Observable<any>): Observable<any> {
    return data.pipe(
      map((result: Object): any => {
        if (result) {
          this.sessionExpired = false;
          return result;
        } else {
          console.log('Error retrieving user data.')
          return EMPTY;
        }
      }),
      catchError((err: any) => {
        if (err.statusText === 'Unauthorized') {
          this.sessionExpired = true;
          this.logout().subscribe({
            next: () => this.navigatorService.navigateToLogin().then()
          })
        } else {
          this.navigatorService.navigateToLogin().then();
        }
        return EMPTY;
      })
    );
  }

  private encrypt(input: string): string {
    return CryptoJS.SHA256(input).toString();
  }

}
