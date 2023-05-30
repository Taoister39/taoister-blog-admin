import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Token, User } from './interface';
import { Menu, admin } from '@core';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private AUTH_URL = environment.adminApiUrl + '/auth';

  constructor(protected http: HttpClient) {}

  login(username: string, password: string, rememberMe = false) {
    return this.http.post<Token>(`${this.AUTH_URL}/login`, { email: username, password });
  }

  refresh(params: Record<string, any>) {
    // return this.http.post<Token>('/auth/refresh', params);
  }

  // logout() {
  //   return this.http.post<any>('/auth/logout', {});
  // }

  me() {
    return of(admin);
  }

  menu() {
    // return this.http.get<{ menu: Menu[] }>('/me/menu').pipe(map(res => res.menu));

    return this.http
      .get<{ menu: Menu[] }>('assets/data/menu.json?_t=' + Date.now())
      .pipe(map(res => res.menu));
  }
}
