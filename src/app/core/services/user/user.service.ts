import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {AuthService} from "../auth/auth.service";
import {User} from "../../../interfaces/user.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private endpoint: string = environment.apiUrl + `/user`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
  }

  public getUser(): Observable<User> {
    return this.authService.checkConnection(
      this.http.get(`${this.endpoint}?email=${this.authService.email}`, {
        headers: this.authService.getHeaders()
      }))
  }

  public getAllUsers(): Observable<User[]> {
    return this.authService.checkConnection(
      this.http.get(this.endpoint, {
        headers: this.authService.getHeaders()
      }))
  }

}
