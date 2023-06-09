export enum CodeEnum {
  SUCCESS,
  FAIL,
}
export enum IS_DELETED_ENUM {
  NO,
  YES,
}

export enum IS_PUBLISHED_ENUM {
  NO,
  YES,
}

export enum SORT_BY_ENUM {
  CREATED_TIME = 'createdTime',
  UPDATED_TIME = 'updatedTime',
}

export enum POST_SORT_BY_ENUM {
  CREATED_TIME = 'createdTime',
  UPDATED_TIME = 'updatedTime',
  PUBLISHED_TIME = 'publishedTime',
}

export enum POST_TYPE_ENUM {
  // 翻译
  TRANSLATION = 'TRANSLATION',
  // 转载
  TRANSSHIPMENT = 'TRANSSHIPMENT',
  // 原创
  ORIGINAL = 'ORIGINAL',
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}
