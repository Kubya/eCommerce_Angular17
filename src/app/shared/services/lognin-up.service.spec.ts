import { TestBed } from '@angular/core/testing';

import { LogninUpService } from './lognin-up.service';

describe('LogninUpService', () => {
  let service: LogninUpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogninUpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
