import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from "./auth.service";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  private apiUrl: string = environment.apiUrl + '/password';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
  }

  public getAllPasswords(): Observable<any> {
    return this.http.get(`${this.apiUrl}`, {headers: this.authService.getHeaders()});
  }

  public getPasswordsBySection(section: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${section}`, {headers: this.authService.getHeaders()});
  }

  public getAllSections(): Observable<any> {
    const user: string = this.authService.email;
    return this.http.get(`${this.apiUrl}/section/${user}`, {headers: this.authService.getHeaders()});
  }

  public addPassword(section: string, password: string, url: string): Observable<any> {
    const user: string = this.authService.email;
    return this.http.post(`${this.apiUrl}/`, {user, section, password, url}, {headers: this.authService.getHeaders()});
  }

  public addSection(title: string): Observable<any> {
    const user: string = this.authService.email;
    return this.http.post(`${this.apiUrl}/newSection`, {user, title}, {headers: this.authService.getHeaders()});
  }
}
