import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { CreateProfileReq, Profile, UpdateProfileReq } from 'app/models/profile';
import { PROFILE_URL } from 'constants/path';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private PROFiLE_URL = environment.adminApiUrl + PROFILE_URL;

  constructor(private request: HttpClient) {}

  findOne(id: string) {
    return this.request.get<Profile>(`${this.PROFiLE_URL}/${id}`);
  }

  getOne() {
    return this.request.get<Profile>(this.PROFiLE_URL);
  }

  createOne(body: CreateProfileReq) {
    return this.request.post(this.PROFiLE_URL, body);
  }

  update(id: string, body: UpdateProfileReq) {
    return this.request.patch(`${this.PROFiLE_URL}/${id}`, body);
  }
}
