import {
  CreatePostCategoryReq,
  FindManyPostCategoryReq,
  PostCategory,
} from './../models/postCategory';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { ListApiResponse } from 'app/models/api';
import { POST_CATEGORY_URL } from 'constants/path';

@Injectable({
  providedIn: 'root',
})
export class PostCategoryService {
  private POST_CATEGORY_URL = environment.adminApiUrl + POST_CATEGORY_URL;
  constructor(private httpClient: HttpClient) {}

  create(createPostCategoryReq: CreatePostCategoryReq) {
    this.httpClient.post(this.POST_CATEGORY_URL, createPostCategoryReq);
  }

  findMany(findManyPostCategoryReq: FindManyPostCategoryReq) {
    return this.httpClient.get<ListApiResponse<PostCategory>>(this.POST_CATEGORY_URL, {
      params: { ...findManyPostCategoryReq },
    });
  }
}
