import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../shared/interfaces/user.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private endpoint: string = environment.apiUrl + `/user`;
  private loggedIn: boolean = false;
  private _currentUser: User | undefined;

  get currentUser(): User | undefined {
    return this._currentUser;
  }

  set currentUser(value: User | undefined) {
    this._currentUser = value;
  }

  constructor(private http: HttpClient) {
  }

  public getUserToken(): string | undefined {
    let token: string | null = localStorage.getItem('loggedInToken');
    if (token !== null) {
      const found = this._currentUser?.token?.find(t => t === token);
      // Si existe el token en el usuario
      if (found) {
        return found;
      }
      // No existe token para este usuario
    }
    // No existe ningún token en el navegador
    return undefined;
  }

  public isLoggedIn(): boolean {
    return this.loggedIn;
  }

  public register(user: User): Observable<User> {
    return this.http.post<User>(this.endpoint, user);
  }
}
