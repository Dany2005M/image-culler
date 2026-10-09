import { TestBed } from '@angular/core/testing';

import { Culler } from './culler';

describe('Culler', () => {
  let service: Culler;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Culler);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
