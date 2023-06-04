import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {catchError, EMPTY, map, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {NavigationService} from "./navigation.service";

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private endpoint: string = environment.apiUrl + `/note`;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private navigatorService: NavigationService
  ) {
  }

  public getNotes(): Observable<any> {
    const email: string = localStorage.getItem('email') ?? '';
    const token: string = localStorage.getItem('token') ?? '';
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
