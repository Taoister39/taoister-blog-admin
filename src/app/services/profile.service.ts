import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ADMIN_API_URL } from '@core';
import { environment } from '@env/environment';
import { ApiResponse } from 'app/models/api';
import { CreateProfileReq, Profile, UpdateProfileReq } from 'app/models/profile';
import { PROFILE_URL } from 'constants/path';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private PROFiLE_URL = this.ADMIN_URL + PROFILE_URL;

  constructor(private request: HttpClient, @Inject(ADMIN_API_URL) private ADMIN_URL: string) {}

  findOne(id: string) {
    return this.request.get<ApiResponse<Profile>>(`${this.PROFiLE_URL}/${id}`);
  }

  getOne() {
    return this.request.get<ApiResponse<Profile>>(this.PROFiLE_URL);
  }

  createOne(body: CreateProfileReq) {
    return this.request.post(this.PROFiLE_URL, body);
  }

  update(id: string, body: UpdateProfileReq) {
    return this.request.patch(`${this.PROFiLE_URL}/${id}`, body);
  }
}
