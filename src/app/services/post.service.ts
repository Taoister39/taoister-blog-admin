import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { ApiResponse, ListApiResponse } from 'app/models/api';
import { CreatePostReq, FindPostReq, Post, UpdatePostReq } from 'app/models/post';
import { POST_URL } from 'constants/path';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private POST_URL = environment.adminApiUrl + POST_URL;

  constructor(private httpClient: HttpClient) {}

  create(createPostReq: CreatePostReq) {
    return this.httpClient.post<ApiResponse<unknown>>(this.POST_URL, createPostReq);
  }

  findMany(findPostReq: FindPostReq) {
    return this.httpClient.get<ListApiResponse<Post>>(this.POST_URL);
  }

  findOne(id: string) {
    return this.httpClient.get<ApiResponse<Post>>(`${this.POST_URL}/${id}`);
  }

  update(id: string, updatePostReq: UpdatePostReq) {
    return this.httpClient.patch<ApiResponse<unknown>>(`${this.POST_URL}/${id}`, updatePostReq);
  }

  delete(id: string) {
    return this.httpClient.delete(`${this.POST_URL}/${id}`);
  }
}
