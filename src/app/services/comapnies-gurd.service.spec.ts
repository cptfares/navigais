import { TestBed } from '@angular/core/testing';

import { ComapniesGurdService } from './comapnies-gurd.service';

describe('ComapniesGurdService', () => {
  let service: ComapniesGurdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComapniesGurdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
