import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Token, User } from './interface';
import { Menu, admin } from '@core';
import { filter, map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { of } from 'rxjs';
import { ApiResponse } from 'app/models/api';
import { ProfileService } from 'app/services/profile.service';
import { CodeEnum } from 'constants/enum';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private AUTH_URL = this.ADMIN_URL + '/auth';

  constructor(
    protected http: HttpClient,
    private profileService: ProfileService,
    @Inject('ADMIN_API_URL') private ADMIN_URL: string
  ) {}

  login(username: string, password: string, rememberMe = false) {
    return this.http.post<ApiResponse<Token>>(`${this.AUTH_URL}/login`, {
      email: username,
      password,
    });
  }

  refresh(params: Record<string, any>) {
    // return this.http.post<Token>('/auth/refresh', params);
  }

  // logout() {
  //   return this.http.post<any>('/auth/logout', {});
  // }

  me() {
    // return of(admin);
    return this.profileService.getOne().pipe(
      filter(res => res.code === CodeEnum.SUCCESS),
      map(res => res.data),
      map(data => ({ id: 1, name: data?.author, ...data }))
    );
  }

  menu() {
    // return this.http.get<{ menu: Menu[] }>('/me/menu').pipe(map(res => res.menu));

    return this.http
      .get<{ menu: Menu[] }>('assets/data/menu.json?_t=' + Date.now())
      .pipe(map(res => res.menu));
  }
}
