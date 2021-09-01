import { TestBed } from '@angular/core/testing';

import { CityGuard } from './city.guard';

describe('CityGuard', () => {
  let guard: CityGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CityGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
