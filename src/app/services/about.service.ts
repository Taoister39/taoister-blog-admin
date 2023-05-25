import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { About, CreateAboutReq, UpdateAboutReq } from 'app/models/about';

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  private ABOUT_URL = environment.adminApiUrl + '/about';

  constructor(private request: HttpClient) {}

  getAbout() {
    return this.request.get<About>(this.ABOUT_URL);
  }

  createAbout(data: CreateAboutReq) {
    return this.request.post(this.ABOUT_URL, data);
  }

  updateAbout(id: string, data: UpdateAboutReq) {
    return this.request.patch(`${this.ABOUT_URL}/${id}`, data);
  }
}
