import { TestBed, inject } from '@angular/core/testing';

import { AccueilService } from './accueil.service';

describe('AccueilService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccueilService]
    });
  });

  it('should be created', inject([AccueilService], (service: AccueilService) => {
    expect(service).toBeTruthy();
  }));
});
