import {
  CreatePostCategoryReq,
  FindManyPostCategoryReq,
  PostCategory,
  UpdatePostCategoryReq,
} from './../models/postCategory';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ADMIN_API_URL } from '@core';
import { environment } from '@env/environment';
import { ApiResponse, ListApiResponse } from 'app/models/api';
import { POST_CATEGORY_URL } from 'constants/path';

@Injectable({
  providedIn: 'root',
})
export class PostCategoryService {
  private POST_CATEGORY_URL = this.ADMIN_URL + POST_CATEGORY_URL;
  constructor(private httpClient: HttpClient, @Inject(ADMIN_API_URL) private ADMIN_URL: string) {}

  create(createPostCategoryReq: CreatePostCategoryReq) {
    return this.httpClient.post<ApiResponse<PostCategory>>(
      this.POST_CATEGORY_URL,
      createPostCategoryReq
    );
  }

  findMany(findManyPostCategoryReq: FindManyPostCategoryReq) {
    return this.httpClient.get<ListApiResponse<PostCategory>>(this.POST_CATEGORY_URL, {
      params: { ...findManyPostCategoryReq },
    });
  }

  findOne(id: string) {
    return this.httpClient.get<ApiResponse<PostCategory>>(`${this.POST_CATEGORY_URL}/${id}`);
  }

  update(id: string, updatePostCategoryReq: UpdatePostCategoryReq) {
    return this.httpClient.patch<ApiResponse<PostCategory>>(
      `${this.POST_CATEGORY_URL}/${id}`,
      updatePostCategoryReq
    );
  }

  delete(id: string) {
    return this.httpClient.delete<ApiResponse<any>>(`${this.POST_CATEGORY_URL}/${id}`);
  }
}
