import { PeopleService } from './people.service';
import { TestBed } from '@angular/core/testing';



describe('People.ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PeopleService = TestBed.get(PeopleService);
    expect(service).toBeTruthy();
  });
});
