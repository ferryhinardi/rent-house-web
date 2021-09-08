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

export type Question = {
  id: number;
  title?: string;
  question_text: string;
  weight: number;
  group_name: string;
  section: 'landing_page' | 'user_preferences';
  type: 'choices' | 'date' | 'text' | 'range_number';
  add_ons: AddOnsChoices | AddOnsRangeNumber;
};

export type House = {
  id: number;
  partner_id: number;
  name: string;
  address: string;
  city: string;
  description: string;
  amenitites: string[];
  minimum_term_length: string;
  lead_media: string;
  galleries: string[];
};

export type AddOnsChoices = { choices: string[] };
export type AddOnsRangeNumber = { range_min: number; range_max: number };

export type Perk = {
  id: number;
  title: string;
  description: string;
  image: string;
};

export type Testimony = {
  id: number;
  testimony_text: string;
  user: {
    id: number;
    name: string;
    job: string;
    profile_picture: string;
  }
}

export type Explore = {};

export type Login = { token: string };
export type ErrorHandling = { message: string };
