import {Injector} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import { HttpClient } from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {UtilsService} from "../utils/utils.service";

export type ResourceId = string | number;

/**
 * Shared REST client for resources that expose the conventional collection
 * routes: GET/POST /resource and GET/PUT/DELETE /resource/:id.
 */
export abstract class BaseApi<T, TCreate = Partial<T>, TUpdate = Partial<T>> {
  protected readonly endpoint: string;
  protected readonly http: HttpClient;
  protected readonly authService: AuthService;
  protected readonly utilsService: UtilsService;

  constructor(
    protected injector: Injector,
    protected source: string
  ) {
    this.authService = this.injector.get(AuthService);
    this.http = injector.get(HttpClient);
    this.utilsService = injector.get(UtilsService);
    this.endpoint = `${environment.apiUrl}/${this.source}`;
  }

  public getAll(): Observable<T[]> {
    return this.authService.checkConnection(this.http.get<T[]>(this.endpoint, {
      headers: this.authService.getHeaders()
    }));
  }

  public getOne(id: ResourceId): Observable<T> {
    return this.authService.checkConnection(this.http.get<T>(`${this.endpoint}/${id}`, {
      headers: this.authService.getHeaders()
    }));
  }

  public addOne(body: TCreate): Observable<T> {
    return this.authService.checkConnection(this.http.post<T>(this.endpoint, body, {
      headers: this.authService.getHeaders()
    }));
  }

  public updateOne(id: ResourceId, body: TUpdate): Observable<T> {
    return this.authService.checkConnection(this.http.put<T>(`${this.endpoint}/${id}`, body, {
      headers: this.authService.getHeaders()
    }));
  }

  public deleteOne(id: ResourceId): Observable<void> {
    return this.authService.checkConnection(this.http.delete<void>(`${this.endpoint}/${id}`, {
      headers: this.authService.getHeaders()
    }));
  }
}
