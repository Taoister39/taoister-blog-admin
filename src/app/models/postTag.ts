import { PaginationReq } from 'app/models/page';
import { IS_DELETED_ENUM, SORT_BY_ENUM, SortOrder } from 'constants/enum';

export interface PostTag {
  id: string;
  name: string;
  description?: string;
  isDeleted: IS_DELETED_ENUM;
  createdAt?: string;
  updatedAt?: string;
}

export interface FindManyPostTagReq extends PaginationReq {
  id?: string;
  name?: string;
  isDeleted?: IS_DELETED_ENUM;
  sortBy?: SORT_BY_ENUM;
  order?: SortOrder;
}

export interface CreatePostTagReq {
  name: string;
  description?: string;
}
export type UpdatePostTagReq = Partial<CreatePostTagReq & { isDeleted?: IS_DELETED_ENUM }>;
