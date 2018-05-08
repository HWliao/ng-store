import { TestBed, inject } from '@angular/core/testing';

import { NgAopService } from './ng-aop.service';

describe('NgAopService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgAopService]
    });
  });

  it('should be created', inject([NgAopService], (service: NgAopService) => {
    expect(service).toBeTruthy();
  }));
});
