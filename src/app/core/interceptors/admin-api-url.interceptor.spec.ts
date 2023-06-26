import { TestBed } from '@angular/core/testing';

import { AdminApiUrlInterceptor } from './admin-api-url.interceptor';

describe('AdminApiUrlInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AdminApiUrlInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AdminApiUrlInterceptor = TestBed.inject(AdminApiUrlInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
