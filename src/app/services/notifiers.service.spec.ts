import { TestBed } from '@angular/core/testing';

import { NotifiersService } from './notifiers.service';

describe('NotifiersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotifiersService = TestBed.get(NotifiersService);
    expect(service).toBeTruthy();
  });
});
