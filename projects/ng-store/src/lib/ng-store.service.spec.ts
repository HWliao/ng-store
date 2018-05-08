import { TestBed, inject } from '@angular/core/testing';

import { NgStoreService } from './ng-store.service';

describe('NgStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgStoreService]
    });
  });

  it('should be created', inject([NgStoreService], (service: NgStoreService) => {
    expect(service).toBeTruthy();
  }));
});
