import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {User} from "../../interfaces/user.interface";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private endpoint: string = environment.apiUrl + `/user`;
  private userSubject: BehaviorSubject<User> = new BehaviorSubject<any>(null);

  get fullName(): string {
    return this.userSubject.value.fullname;
  }

  get email(): string {
    return this.userSubject.value.email;
  }

  constructor(private http: HttpClient) {
  }

  public getUserByEmail(): Observable<any> {
    const token: string = localStorage.getItem('token') ?? '';
    const email: string = localStorage.getItem('email') ?? '';
    const headers: HttpHeaders = new HttpHeaders().set('Authorization', `${token}`);
    return this.http.get(`${this.endpoint}?email=${email}`, {headers: headers});
  }

  private setUser(user: User): void {
    this.userSubject.next(user);
  }

}
