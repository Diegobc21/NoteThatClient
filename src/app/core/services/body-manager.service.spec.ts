import { TestBed } from '@angular/core/testing';

import { BodyManagerService } from './body-manager.service';

describe('BodyManagerService', () => {
  let service: BodyManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BodyManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
