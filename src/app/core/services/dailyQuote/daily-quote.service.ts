import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {environment} from "../../../../environments/environment";

export interface Quote {
  phrase: string;
  author: string;
}

@Injectable({
  providedIn: 'root'
})
export class DailyQuoteService {
  private endpoint: string = environment.apiUrl + '/quote';

  constructor(
    private http: HttpClient
  ) {
  }

  public getTodaysQuote(): Observable<Quote> {
    return this.http.get<Quote>(this.endpoint);
  }

  public getLastReadDay(): string | null {
    return localStorage.getItem('readOn');
  }

  private markAsRead(): void {
    localStorage.setItem('readOn', new Date().toUTCString());
  }
}
