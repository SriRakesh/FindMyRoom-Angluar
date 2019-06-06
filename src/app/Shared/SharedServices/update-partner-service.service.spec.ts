import { TestBed } from '@angular/core/testing';

import { UpdatePartnerServiceService } from './update-partner-service.service';

describe('UpdatePartnerServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdatePartnerServiceService = TestBed.get(UpdatePartnerServiceService);
    expect(service).toBeTruthy();
  });
});
