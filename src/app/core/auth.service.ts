import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private endpoint: string = environment.apiUrl + `/auth`;
  private loggedIn: boolean = false;

  constructor(private http: HttpClient) {
  }

  public isLoggedIn(): boolean {
    return this.loggedIn;
  }

  public register(form: any): void {
    // return this.http.post(this.endpoint + '/auth', form).toPromise();
  }
}
