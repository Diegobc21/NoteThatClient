import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';
import {Password, PasswordCreate, PasswordUpdate} from "../../../interfaces/password.interface";
import {BaseApi} from "../base-api/base-api.service";

interface PasswordVerificationResponse {
  valid: boolean;
}

interface UncensoredPasswordResponse {
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class PasswordService extends BaseApi<Password, PasswordCreate, PasswordUpdate> {
  constructor(injector: Injector) {
    super(injector, 'password');
  }

  public getPasswordsBySection(sectionId: string): Observable<Password[]> {
    return this.authService.checkConnection(
      this.http.get<Password[]>(`${this.endpoint}/section/${sectionId}`, {
        headers: this.authService.getHeaders(),
      })
    );
  }

  public checkAccountPassword(pass: string): Observable<PasswordVerificationResponse> {
    return this.authService.checkConnection(this.http.post<PasswordVerificationResponse>(
      `${this.endpoint}/make-visible`,
      {password: this.utilsService.encryptMd5(pass)},
      {headers: this.authService.getHeaders()}
    ));
  }

  public getUncensoredPassword(passwordId: string): Observable<UncensoredPasswordResponse> {
    return this.authService.checkConnection(this.http.get<UncensoredPasswordResponse>(
      `${this.endpoint}/uncensored/${passwordId}`,
      {headers: this.authService.getHeaders()}
    ));
  }

  public setPasswordsVisible(): void {
    sessionStorage.setItem('passwords-visible', 'true');
  }

  public checkIfPasswordsAreVisible(): boolean {
    return sessionStorage.getItem('passwords-visible') === 'true';
  }

}
