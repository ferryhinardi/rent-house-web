export type ResponseItem<T> = {
  count: number;
  count_page: number;
  data: T[];
  has_more: boolean;
  page: number;
};

export type User = {
  email: string;
  email_verified: boolean;
  id: number;
  last_login_at: string;
  name: string;
  provider_type: number;
  provider_user_id: string;
  role_id: number;
};

export type Perk = {
  id: number;
  title: string;
  description: string;
  image: string;
};

export type Login = { token: string };
export type ErrorHandling = { message: string };

