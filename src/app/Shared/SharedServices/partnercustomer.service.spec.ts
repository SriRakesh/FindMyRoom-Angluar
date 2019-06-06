import { TestBed } from '@angular/core/testing';

import { PartnercustomerService } from './partnercustomer.service';

describe('PartnercustomerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PartnercustomerService = TestBed.get(PartnercustomerService);
    expect(service).toBeTruthy();
  });
});
