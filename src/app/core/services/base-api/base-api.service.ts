import {Injector} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {UtilsService} from "../utils/utils.service";

export abstract class BaseApi<T> {
  protected endpoint: string;
  protected http: HttpClient;
  protected authService: AuthService;
  protected utilsService: UtilsService;

  constructor(
    protected injector: Injector,
    protected source: string
  ) {
    this.authService = this.injector.get(AuthService);
    this.http = injector.get(HttpClient);
    this.utilsService = injector.get(UtilsService);
    this.endpoint = `${environment.apiUrl}/${this.source}`;
  }

  public getAll<T>(): Observable<T> {
    return this.authService.checkConnection(this.http.post<T>(`${this.endpoint}/all`, {email: this.authService.email}, {
      headers: this.authService.getHeaders()
    }));
  }

  public getOne<T>(id: string | number): Observable<T> {
    return this.authService.checkConnection(this.http.get<T>(`${this.endpoint}/${id}`, {
      headers: this.authService.getHeaders()
    }));
  }

  public addOne<T>(body: any): Observable<T> {
    return this.authService.checkConnection(this.http.post<T>(this.endpoint, body, {
      headers: this.authService.getHeaders()
    }));
  }

  public updateOne<T>(id: string | number, body: any): Observable<T> {
    return this.authService.checkConnection(this.http.put<T>(`${this.endpoint}/${id}`, body, {
      headers: this.authService.getHeaders()
    }));
  }

  public deleteOne<T>(id: string | number): Observable<T> {
    return this.authService.checkConnection(this.http.delete<T>(`${this.endpoint}/${id}`, {
      headers: this.authService.getHeaders()
    }));
  }
}
