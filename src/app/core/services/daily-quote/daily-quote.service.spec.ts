import { TestBed } from '@angular/core/testing';

import { DailyQuoteService } from './daily-quote.service';

describe('DailyQuoteService', () => {
  let service: DailyQuoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailyQuoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
