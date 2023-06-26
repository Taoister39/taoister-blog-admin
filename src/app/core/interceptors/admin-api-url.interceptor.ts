import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

export const ADMIN_API_URL = new InjectionToken('ADMIN_API_URL');

@Injectable()
/**
 * 後端接口的攔截器，注意會和部分的service功能重複
 * 等同於axios，new了一條實例後的成功與失敗
 */
export class AdminApiUrlInterceptor implements HttpInterceptor {
  private hasApiUrl(url: string) {
    return url.includes(this.adminUrl);
  }

  constructor(@Inject(ADMIN_API_URL) private adminUrl: string) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request);
  }
}
