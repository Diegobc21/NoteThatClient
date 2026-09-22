import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {catchError, Observable, tap, throwError} from 'rxjs';
import {User} from '../../../interfaces/user.interface';
import {NavigationService} from '../navigation/navigation.service';
import {UtilsService} from "../utils/utils.service";

interface LoginResponse {
  email: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _sessionExpired: boolean = false;
  private endpoint: string = environment.apiUrl + `/user`;

  constructor(
    private http: HttpClient,
    private navigatorService: NavigationService,
    private utilsService: UtilsService
  ) {
  }

  get sessionExpired(): boolean {
    return this._sessionExpired;
  }

  set sessionExpired(value: boolean) {
    this._sessionExpired = value;
  }

  get token(): string {
    return localStorage.getItem('token') ?? '';
  }

  get email(): string {
    const email = localStorage.getItem('email');
    if (email !== '' && email !== null) {
      return email;
    }
    console.error('ERROR: Email not found')
    this.logout();
    return '';
  }

  public isLoggedIn(): boolean {
    return this.token !== '' && this.token !== null;
  }

  public register(user: User): Observable<User> {
    return this.http.post<User>(this.endpoint + '/register', {
      ...user,
      password: this.utilsService.encryptMd5(user.password),
    });
  }

  public login(user: User): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.endpoint + '/login', {
      ...user,
      password: this.utilsService.encryptMd5(user.password),
    }).pipe(
      tap({
          next: (res: LoginResponse) => this.saveLocalStorage(res.token, res.email),
          error: (err: HttpErrorResponse) => console.error(err)
        }
      )
    );
  }

  public logout(): void {
    this.clearLocalStorage();
    this.clearSessionStorage();
    this.navigatorService
      .navigateToLogin().then(() => null);
  }

  public getHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  }

  private saveLocalStorage(token: string, email: string): void {
    localStorage.setItem('token', token ?? '');
    localStorage.setItem('email', email ?? '');
  }

  private clearLocalStorage(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  }

  private clearSessionStorage(): void {
    sessionStorage.clear();
  }

  public checkConnection<T>(data: Observable<T>): Observable<T> {
    return data.pipe(
      catchError((err: HttpErrorResponse) => {
        // Validation, conflict and server errors should reach the feature UI;
        // only an authentication failure ends the current session.
        if (err.status === 401 || err.status === 403) {
          this.logout();
        }
        return throwError(() => err);
      })
    );
  }
}
