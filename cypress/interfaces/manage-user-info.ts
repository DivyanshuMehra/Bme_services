export interface UserInfo {
  user_email: string;
  first_name: string;
  last_name: string;
  feedback_duration?: string;
  user_type?: string;
  select_admin?: string;
  select_participant?: string;
  rater_type?: string;
}

export interface UserFormData {
  email: string;
  full_name?: string;
  number?: number;
  alpha_numeric?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
}
