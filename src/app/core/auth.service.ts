import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private endpoint: string = environment.apiUrl + `/user`;
  private loggedIn: boolean = false;

  constructor(private http: HttpClient) {
  }

  public isLoggedIn(): boolean {
    return this.loggedIn;
  }

  public register(form: any): Observable<void> {
    const newUser = {
      fullname: form.fullname,
      email: form.email,
      password: form.password
    }
    return this.http.post<void>(this.endpoint, newUser);
  }
}
