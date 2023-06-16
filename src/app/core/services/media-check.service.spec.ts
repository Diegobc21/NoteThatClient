import { TestBed } from '@angular/core/testing';

import { MediaCheckService } from './media-check.service';

describe('MediaCheckService', () => {
  let service: MediaCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediaCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
