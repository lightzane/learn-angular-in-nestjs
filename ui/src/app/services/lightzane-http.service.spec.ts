import { TestBed } from '@angular/core/testing';

import { LightzaneHttpService } from './lightzane-http.service';

describe('LightzaneHttpService', () => {
  let service: LightzaneHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LightzaneHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
