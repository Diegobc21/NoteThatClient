import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  private apiUrl: string = environment.apiUrl + '/password';

  constructor(private http: HttpClient, private authService: AuthService) {}

  public getAllPasswords(): Observable<any> {
    return this.http.get(`${this.apiUrl}`, {
      headers: this.authService.getHeaders(),
    });
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

  public addPassword(
    section: string,
    password: string,
    title: string,
    username?: string
  ): Observable<any> {
    const user = this.authService.email;
    return this.http.post(
      `${this.apiUrl}/`,
      { section, password, title, user, username },
      { headers: this.authService.getHeaders() }
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
      { user, title },
      { headers: this.authService.getHeaders() }
    );
  }
}
