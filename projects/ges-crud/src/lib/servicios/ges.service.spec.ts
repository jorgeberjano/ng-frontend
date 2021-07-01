import { TestBed } from '@angular/core/testing';

import { GesService } from './ges.service';

describe('ServicioGesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GesService = TestBed.get(GesService);
    expect(service).toBeTruthy();
  });
});
