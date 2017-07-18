import { TestBed, inject } from '@angular/core/testing';

import { MetierService } from './metier.service';

describe('MetierService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MetierService]
    });
  });

  it('should be created', inject([MetierService], (service: MetierService) => {
    expect(service).toBeTruthy();
  }));
});
