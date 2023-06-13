import {
  CreatePostCategoryReq,
  FindManyPostCategoryReq,
  PostCategory,
  UpdatePostCategoryReq,
} from './../models/postCategory';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { ApiResponse, ListApiResponse } from 'app/models/api';
import { POST_CATEGORY_URL } from 'constants/path';

@Injectable({
  providedIn: 'root',
})
export class PostCategoryService {
  private POST_CATEGORY_URL = environment.adminApiUrl + POST_CATEGORY_URL;
  constructor(private httpClient: HttpClient) {}

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
