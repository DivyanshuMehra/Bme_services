export interface UserInfo {
  email: string;
  first_name: string;
  last_name: string;
}

export interface ProfileInfo {
  first_name: string;
  last_name: string;
  email?: string;
}

export interface LoginInfo {
  email: string;
  password: string;
}
