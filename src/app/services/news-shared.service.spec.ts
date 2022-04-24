import { TestBed } from '@angular/core/testing';

import { NewsSharedService } from './news-shared.service';

describe('NewsSharedService', () => {
  let service: NewsSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
