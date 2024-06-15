import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {environment} from '../../../../environments/environment';
import {UtilsService} from "../utils/utils.service";
import {Password} from "../../../options/passwords/passwords.component";

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  private apiUrl: string = environment.apiUrl + '/password';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private utilsService: UtilsService
  ) {
  }

  public getPasswordsBySection(section: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${section}`, {
      headers: this.authService.getHeaders(),
    });
  }

  public getUserSections(): Observable<any> {
    const user: string = this.authService.email;
    return this.http.get(`${this.apiUrl}/section/${user}`, {
      headers: this.authService.getHeaders(),
    });
  }

  public addPassword(password: any): Observable<any> {
    const user = this.authService.email;
    return this.http.post(
      `${this.apiUrl}/`,
      {...password, user},
      {headers: this.authService.getHeaders()}
    );
  }

  public deleteOne(passwordId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${passwordId}`, {
      headers: this.authService.getHeaders(),
    });
  }

  public deleteOneSection(sectionId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/section/${sectionId}`, {
      headers: this.authService.getHeaders(),
    });
  }

  public addSection(title: string): Observable<any> {
    const user: string = this.authService.email;
    return this.http.post(
      `${this.apiUrl}/section`,
      {user, title},
      {headers: this.authService.getHeaders()}
    );
  }

  public updateSection(section: any, newTitle: string): Observable<any> {
    const user: string = this.authService.email;
    const updatedSection = {...section, title: newTitle};
    return this.http.put(
      `${this.apiUrl}/section`,
      {user, section: updatedSection},
      {headers: this.authService.getHeaders()}
    );
  }

  public updatePassword(passwordId: any, newPassword: Password): Observable<any> {
    const user: string = this.authService.email;
    const updatedPassword =
      {
        ...newPassword,
        _id: passwordId
      };
    return this.http.put(
      `${this.apiUrl}/password`,
      {user, password: updatedPassword},
      {headers: this.authService.getHeaders()}
    );
  }

  public checkAccountPassword(pass: string): Observable<any> {
    const email: string = this.authService.email;
    return this.http.post(
      `${this.apiUrl}/make-visible`,
      {email, password: this.utilsService.encryptMd5(pass)},
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
