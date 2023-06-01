import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {User} from "../../interfaces/user.interface";
import {BehaviorSubject, catchError, EMPTY, map, Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {NavigationService} from "./navigation.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private endpoint: string = environment.apiUrl + `/user`;
  private userSubject: BehaviorSubject<User> = new BehaviorSubject<any>(null);

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private navigatorService: NavigationService
  ) {
  }

  get email(): string {
    return this.userSubject.value.email;
  }

  public getUserByEmail(): Observable<any> {
    const token: string = localStorage.getItem('token') ?? '';
    const email: string = localStorage.getItem('email') ?? '';
    const headers: HttpHeaders = new HttpHeaders().set('Authorization', `${token}`);
    return this.http.get(`${this.endpoint}?email=${email}`, {headers: headers})
      .pipe(
        map((result: Object): any => {
          if (result) {
            this.authService.sessionExpired = false;
            return result;
          } else {
            console.log('Error retrieving user data.')
            return EMPTY;
          }
        }),
        catchError((err: any) => {
          if (err.statusText === 'Unauthorized') {
            this.authService.sessionExpired = true;
            this.authService.logout().subscribe({
              next: () => this.navigatorService.navigateToLogin().then()
            })
          }
          return EMPTY;
        })
      );
  }

}
