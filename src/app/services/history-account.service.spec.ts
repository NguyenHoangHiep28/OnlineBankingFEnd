import { TestBed } from '@angular/core/testing';

import { HistoryAccountService } from './history-account.service';

describe('HistoryAccountService', () => {
  let service: HistoryAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoryAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
