export type ResponseItem<T> = {
  count: number;
  count_page: number;
  data: T[];
  has_more: boolean;
  page: number;
};

export type Perk = {
  id: number;
  title: string;
  description: string;
  image: string;
};

export type Response = { token: string };
export type ErrorHandling = { message: string };

