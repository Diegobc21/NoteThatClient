import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  private endpoint: string = environment.apiUrl + `/user`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
  }

  public getAllUserFriends(): Observable<any> {
    return this.authService.checkConnection(
      this.http.get(`${this.endpoint}?email=${this.authService.email}`, {
        headers: this.authService.getHeaders()
      }))
  }
}
