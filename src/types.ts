export type ResponseItem<T> = {
  count: number;
  count_page: number;
  data: T[];
  has_more: boolean;
  page: number;
};

export type Question = {
  id: number;
  title?: string;
  question_text: string;
  weight: number;
  category: string;
  section: 'landing_page' | 'user_preferences';
  type: 'CHOICES' | 'DATE' | 'TEXT' | 'RANGE_NUMBER';
  matching_tag: string;
  add_ons: AddOns;
};

export type AddOns = {
  choices?: string[];
  range_number_min?: number;
  range_number_max?: number;
  tags?: string[];
};

export type House = {
  id: number;
  partner_id: number;
  name: string;
  address: string;
  city: string;
  description: string;
  amenities: {
    icon: 'rooftop' | 'gym' | 'pool' | 'laundry' | 'bedroom' | 'bathroom' | 'diningroom';
    name: string;
  }[];
  minimum_term_length: string;
  lead_media: string;
  galleries: string[];
  floor_plan_image: string;
  amenities_description?: string;
  external_url?: string;
  location_lat: Location;
  location_lon: Location;
  tags: string[];
  created_at?: string;
  updated_at?: string;
};

type Location = { Float64: number; Valid: boolean };

export type UserAnswers = {
  question_id: number;
  value: string;
  tag: string;
}[];

export type Answer = {
  question_id: number;
  value: string;
  tag: string;
};

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

export type Room = {
  id: number;
  name: string;
  price: number;
  currency_code: string;
};

export type Login = { token: string };
export type ErrorHandling = { message: string };
export type QuestionState = {
  name: string;
  value?: string;
  questionID?: number;
  tag: string;
};
export type PreferenceQuestionState = {
  states: QuestionState[];
};

export type User = {
  email: string;
  email_verified: boolean;
  id: number;
  last_login_at?: string;
  name: string;
  job: string;
  bio: string;
  address: string;
  currency_code: string;
  profile_picture: string;
  phone: string;
  annual_income: number;
  credit_score: number;
  gender: number;
  provider_type: number;
  provider_user_id: string;
  role_id: number;
  birth_date?: string;
  phone_verified: boolean;
};

export type UserDocument = {
  id: number;
  user_id: number;
  document_type: number;
  document_path: string;
  is_verified: boolean;
};

export type EmergencyContactType = {
  name: string;
  email: string;
  phone: string;
  relationship: string;
};

export type PayloadUpdateUser = User & {
  dob: string;
  gender: Option;
  government_id: FileList;
  credit_report: FileList;
  profile_picture: string | FileList;
  document_type: string;
  document_files: FileList;
  social_media_url: string;
  proof_of_income_type: Option;
  paystubs?: FileList;
  guarantor_paystubs?: FileList;
  guarantor_government_id?: FileList;
  guarantor_credit_report?: FileList;
  emergencyContacts: EmergencyContactType[];
};

export type Option = { label: string; value: number };

export type ApplicationData = {
  id: number;
  user_id: number;
  house_id: number;
  house: House;
  room_id?: number;
  city: string;
  moving_date: string;
  budget: string;
  status: string;
  is_deposit_paid: boolean;
  is_approved: boolean;
  is_completed: boolean;
  is_canceled: boolean;
};

export type Roomate = {
  roomates: User[];
  roommate_ids: number[];
  to_match: boolean;
  room_id: number;
  house_id: number;
  tags: string[];
} & User;
