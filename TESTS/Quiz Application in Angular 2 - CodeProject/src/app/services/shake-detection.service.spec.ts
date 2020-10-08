import { TestBed } from '@angular/core/testing';

import { ShakeDetectionService } from './shake-detection.service';

describe('ShakeDetectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShakeDetectionService = TestBed.get(ShakeDetectionService);
    expect(service).toBeTruthy();
  });
});
