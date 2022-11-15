import { TestBed } from '@angular/core/testing';

import { LazyLoadGuard } from './lazy-load.guard';

describe('LazyLoadGuard', () => {
  let guard: LazyLoadGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LazyLoadGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
