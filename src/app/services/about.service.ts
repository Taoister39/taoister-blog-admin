import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ADMIN_API_URL } from '@core';
import { environment } from '@env/environment';
import { About, CreateAboutReq, UpdateAboutReq } from 'app/models/about';
import { ApiResponse } from 'app/models/api';
import { ABOUT_URL } from 'constants/path';

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  private ABOUT_URL = this.ADMIN_URL + ABOUT_URL;

  constructor(private request: HttpClient, @Inject(ADMIN_API_URL) private ADMIN_URL: string) {}

  getAbout() {
    return this.request.get<ApiResponse<About>>(this.ABOUT_URL);
  }

  createAbout(data: CreateAboutReq) {
    return this.request.post(this.ABOUT_URL, data);
  }

  updateAbout(id: string, data: UpdateAboutReq) {
    return this.request.patch(`${this.ABOUT_URL}/${id}`, data);
  }
}
