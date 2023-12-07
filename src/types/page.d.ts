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
  data: T[];
  totalCount: number;
};
