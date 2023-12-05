export type PageProps = {
  params: Record<string, string>;
  searchParams: Record<string, string>;
};

export type ISearchParam = {
  limit: number;
  page: number;
  searchTerm?: string;
};

export type IListItem<T> = {
  totalCount: number;
  data: T[];
};
