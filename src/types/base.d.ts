export type Maybe<T> = T | null | undefined;
export type Nullable<T> = T | null;
export interface ILabel {
  code: string;
  label: string;
}

export type PageProps = {
  params: Record<string, string>;
  searchParams: ISearchParam;
};

export type ISearchParam = {
  limit: number;
  page: number;
  searchTerm?: string;
};

export type IListItem<T> = {
  data: T[];
  success: boolean;
  totalCount: number;
};

export type IActionResponse<T> = {
  message: string;
  success: boolean;
  data?: T | string;
};
