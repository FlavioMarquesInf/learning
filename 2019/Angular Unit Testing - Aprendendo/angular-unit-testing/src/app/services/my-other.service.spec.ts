import { TestBed } from '@angular/core/testing';

import { MyOtherService } from './my-other.service';

describe('MyOtherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyOtherService = TestBed.get(MyOtherService);
    expect(service).toBeTruthy();
  });
});
