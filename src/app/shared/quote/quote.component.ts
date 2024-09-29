import {Component, OnDestroy} from '@angular/core';
import {DailyQuoteService, Quote} from "../../core/services/daily-quote/daily-quote.service";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrl: './quote.component.scss'
})
export class QuoteComponent implements OnDestroy {

  public phrase: string = '';
  public author: string = '';

  public quote$: Observable<Quote>;
  public subscriptions: Subscription[] = [];

  constructor(private dailyQuoteService: DailyQuoteService) {
    this.quote$ = this.dailyQuoteService.getTodaysQuote();
    this.subscriptions.push(
      this.quote$.subscribe(
        {
          next: (quote: Quote) => {
            this.phrase = quote.phrase;
            this.author = quote.author;
          },
          error: (err) => console.error(err)
        }
      ))
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
