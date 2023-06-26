import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export const BASE_URL = new InjectionToken<string>('BASE_URL');

@Injectable()
/**
 * 這個攔截器，最適合作爲前綴添加
 */
export class BaseUrlInterceptor implements HttpInterceptor {
  // baseUrl 存在，如果是一次HTTP或HTTPS請求
  private hasScheme = (url: string) => this.baseUrl && new RegExp('^http(s)?://', 'i').test(url);

  constructor(@Optional() @Inject(BASE_URL) private baseUrl?: string) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.hasScheme(request.url) === false
      ? next.handle(request.clone({ url: this.prependBaseUrl(request.url) }))
      : next.handle(request);
  }
  // BASE_URL和請求的進行拼接
  // 前端 fetch("/ss") 變成 fetch(`${this.baseUrl}/ss`);
  private prependBaseUrl(url: string) {
    return [this.baseUrl?.replace(/\/$/g, ''), url.replace(/^\.?\//, '')]
      .filter(val => val)
      .join('/');
  }
}
