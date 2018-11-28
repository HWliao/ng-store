import { TestBed } from '@angular/core/testing';

import { NgsrService } from './ngsr.service';

describe('NgsrService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgsrService = TestBed.get(NgsrService);
    expect(service).toBeTruthy();
  });
});
