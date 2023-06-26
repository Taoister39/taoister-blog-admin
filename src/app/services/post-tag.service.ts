import { FindManyPostTagReq, PostTag, UpdatePostTagReq } from './../models/postTag';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ADMIN_API_URL } from '@core';
import { environment } from '@env/environment';
import { ApiResponse, ListApiResponse } from 'app/models/api';
import { CreatePostTagReq } from 'app/models/postTag';
import { POST_TAG_URL } from 'constants/path';

@Injectable({
  providedIn: 'root',
})
export class PostTagService {
  private POST_TAG_URL = this.ADMIN_URL + POST_TAG_URL;

  constructor(private httpClient: HttpClient, @Inject(ADMIN_API_URL) private ADMIN_URL: string) {}

  create(createPostTagReq: CreatePostTagReq) {
    return this.httpClient.post<ApiResponse<unknown>>(this.POST_TAG_URL, createPostTagReq);
  }

  findMany(findManyPostTagReq: FindManyPostTagReq) {
    return this.httpClient.get<ListApiResponse<PostTag>>(this.POST_TAG_URL, {
      params: { ...findManyPostTagReq },
    });
  }

  update(id: string, updatePostTagReq: UpdatePostTagReq) {
    return this.httpClient.patch<ApiResponse<unknown>>(
      `${this.POST_TAG_URL}/${id}`,
      updatePostTagReq
    );
  }

  findOne(id: string) {
    return this.httpClient.get<ApiResponse<PostTag>>(`${this.POST_TAG_URL}/${id}`);
  }

  delete(id: string) {
    return this.httpClient.delete<ApiResponse<unknown>>(`${this.POST_TAG_URL}/${id}`);
  }
}
