import { PaginationReq } from 'app/models/page';
import { IS_DELETED_ENUM, SORT_BY_ENUM, SortOrder } from 'constants/enum';

export interface CreatePostCategoryReq {
  name: string;
  description?: string;
}

export type UpdatePostCategoryReq = Partial<
  CreatePostCategoryReq & { isDeleted?: IS_DELETED_ENUM }
>;

export interface PostCategory {
  id: string;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface FindManyPostCategoryReq extends PaginationReq {
  id?: string;
  name?: string;
  isDeleted?: IS_DELETED_ENUM;
  sortBy?: SORT_BY_ENUM;
  order?: SortOrder;
}
