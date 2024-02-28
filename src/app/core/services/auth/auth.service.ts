import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, EMPTY, map, Observable, tap} from 'rxjs';
import {User} from '../../../interfaces/user.interface';
import {NavigationService} from '../navigation/navigation.service';
import {UtilsService} from "../utils/utils.service";

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
    user.password = this.utilsService.encryptMd5(user.password);
    return this.http.post<User>(this.endpoint + '/register', user);
  }

  public login(user: User): Observable<any> {
    user.password = this.utilsService.encryptMd5(user.password);
    return this.http.post<User>(this.endpoint + '/login', user).pipe(
      tap({
          next: (res: any) => this.saveLocalStorage(res.token, res.email),
          error: (err: any) => console.error(err)
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
    return new HttpHeaders().set('Authorization', `${this.token}`);
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

  public checkConnection(data: Observable<any>): Observable<any> {
    return data.pipe(
      map((result: Object): any => {
        if (result) {
          return result;
        } else {
          console.log('Error retrieving user data.');
          this.logout();
          return EMPTY;
        }
      }),
      catchError((err: any) => {
        console.error('ServerError: ', err)
        this.logout();
        return EMPTY;
      })
    );
  }
}
