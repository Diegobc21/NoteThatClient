import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';
import {Password, Section} from "../../../interfaces/password.interface";
import {BaseApi} from "../base-api/base-api.service";

@Injectable({
  providedIn: 'root',
})
export class PasswordService extends BaseApi<Password> {
  constructor(injector: Injector) {
    super(injector, 'password');
  }

  public getPasswordsBySection(section: Section): Observable<Password[]> {
    return this.http.post<Password[]>(
      `${this.endpoint}/bySection`,
      {...section},
      {
        headers: this.authService.getHeaders(),
      }
    );
  }

  public checkAccountPassword(pass: string): Observable<any> {
    const email: string = this.authService.email;
    return this.http.post(
      `${this.endpoint}/make-visible`,
      {email, password: this.utilsService.encryptMd5(pass)},
      {headers: this.authService.getHeaders()}
    );
  }

  public getUncensoredPassword(passwordId: string): Observable<any> {
    return this.http.get(
      `${this.endpoint}/uncensored/${passwordId}`,
      {headers: this.authService.getHeaders()}
    );
  }

  public setPasswordsVisible(): void {
    sessionStorage.setItem('passwords-visible', 'true');
  }

  public checkIfPasswordsAreVisible(): boolean {
    return sessionStorage.getItem('passwords-visible') === 'true';
  }

  public setPasswordsNotVisible(): void {
    sessionStorage.removeItem('passwords-visible');
  }
}
