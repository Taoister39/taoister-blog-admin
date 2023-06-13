import { PostCategory } from 'app/models/postCategory';
import { PostTag } from 'app/models/postTag';
import {
  IS_DELETED_ENUM,
  IS_PUBLISHED_ENUM,
  POST_SORT_BY_ENUM,
  POST_TYPE_ENUM,
  SortOrder as SortOrderEnum,
} from 'constants/enum';

export interface CreatePostReq {
  title: string;
  description?: string;
  content: string;
  categories?: string[];
  tags?: string[];
  type: POST_TYPE_ENUM;
}

export interface Post {
  id: string;
  title: string;
  description?: string;
  content: string;
  view: number;
  isDeleted: IS_DELETED_ENUM;
  isPublished: IS_PUBLISHED_ENUM;
  type: POST_TYPE_ENUM;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  categories?: PostTag[];
  tags?: PostCategory[];
}

export type UpdatePostReq = Partial<
  CreatePostReq & { isDeleted: IS_DELETED_ENUM; isPublished?: IS_PUBLISHED_ENUM }
>;

export interface FindPostReq {
  id?: string;
  title?: string;
  type?: POST_TYPE_ENUM;
  isPublished?: boolean;
  isDeleted?: boolean;
  categories?: string[];
  tags?: string[];
  sortBy?: POST_SORT_BY_ENUM;
  order?: SortOrderEnum;
}
