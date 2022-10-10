import { TestBed } from '@angular/core/testing';

import { CountryDetailGuard } from './country-detail.guard';

describe('CountryDetailGuard', () => {
  let guard: CountryDetailGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CountryDetailGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
