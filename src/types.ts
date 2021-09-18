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
  category: string;
  section: 'landing_page' | 'user_preferences';
  type: 'CHOICES' | 'DATE' | 'TEXT' | 'RANGE_NUMBER';
  add_ons: AddOns;
};

export type AddOns = {
  choices?: string[];
  range_number_min?: number;
  range_number_max?: number;
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

export type UserAnswers = {
  question_id: number;
  value: string;
}[];

export type Answer = {
  question_id: number;
  value: string;
}

export type AnswerState = {
  questionID: number;
  questionTitle: String;
  answer: String;
};

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
  };
};

export type Process = {
  id: number;
  title: string;
  description: string;
  image: string;
  step_order: number;
};

export type Login = { token: string };
export type ErrorHandling = { message: string };
