import { FindManyPostTagReq, PostTag } from './../models/postTag';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { ListApiResponse } from 'app/models/api';
import { CreatePostTagReq } from 'app/models/postTag';
import { POST_TAG_URL } from 'constants/path';

@Injectable({
  providedIn: 'root',
})
export class PostTagService {
  private POST_TAG_URL = environment.adminApiUrl + POST_TAG_URL;

  constructor(private httpClient: HttpClient) {}

  create(createPostTagReq: CreatePostTagReq) {
    return this.httpClient.post(this.POST_TAG_URL, createPostTagReq);
  }

  findMany(findManyPostTagReq: FindManyPostTagReq) {
    return this.httpClient.get<ListApiResponse<PostTag>>(this.POST_TAG_URL, {
      params: { ...findManyPostTagReq },
    });
  }
}
