import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface Quote {
  phrase: string;
  author: string;
}

@Injectable({
  providedIn: 'root',
})
export class DailyQuoteService {
  private endpoint: string = environment.apiUrl + '/quote';

  constructor(private http: HttpClient) {}

  public getTodaysQuote(): Observable<Quote> {
    const localStoreAuthor = localStorage.getItem('latestQuoteAuthor')
    const localStorePhrase = localStorage.getItem('latestQuotePhrase')
    if (
      this.getLastReadOn() === new Date().toLocaleDateString() &&
      localStoreAuthor !== null && localStorePhrase !== null
    ) {
      return of({
        phrase: localStorage.getItem('latestQuotePhrase'),
        author: localStorage.getItem('latestQuoteAuthor'),
      } as Quote);
    }
    return this.http.get<Quote>(this.endpoint).pipe(
      map((res: Quote) => {
        this.saveToSessionStorage(res);
        return res;
      })
    );
  }

  private getLastReadOn(): string | null {
    return localStorage.getItem('quoteReadOn');
  }

  private saveToSessionStorage(quote: Quote): void {
    localStorage.setItem('latestQuoteAuthor', quote.author);
    localStorage.setItem('latestQuotePhrase', quote.phrase);
    localStorage.setItem('quoteReadOn', new Date().toLocaleDateString());
  }
}
