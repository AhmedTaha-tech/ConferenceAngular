import { TestBed } from '@angular/core/testing';

import { DashboardLoginService } from './dashboard-login.service';

describe('DashboardLoginService', () => {
  let service: DashboardLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
