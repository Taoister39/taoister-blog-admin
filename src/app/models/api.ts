import { CodeEnum } from 'constants/enum';

export interface ApiResponse<T> {
  code: CodeEnum;
  message: string;
  data?: T;
}

export interface ListApiResponse<T> {
  code: CodeEnum;
  message: string;
  data: {
    lists?: T[];
    totalItems: number;
  };
}

export interface PaginationRequest {
  limit?: number;
  offset?: number;
}
