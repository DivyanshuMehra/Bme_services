import { QuestionInfo } from "./questions-info";
import { ProfileInfo } from "./user-info";
import { CompanyInfo } from "./company-info";
import { UserInfo } from "./manage-user-info";

export interface ProfileFormField {
  label: string;
  name: keyof ProfileInfo;
}

export interface QuestionFormField {
  label: string;
  type: string;
  name: keyof QuestionInfo;
}

export interface ButtonInfo {
  name: string;
  label: string;
  class: string;
}

export interface IconInfo {
  name: string;
  class: string;
}

export interface ButtonMessageInfo {
  name: string;
  button_label: string;
  message: string;
}

export interface CompanyFormField {
  name: keyof CompanyInfo;
  label: string;
  type: string;
}

export interface UserFormField {
  name: keyof UserInfo;
  label: string;
  type: string;
}

export interface UserFormValidation {
  name: keyof UserInfo;
  label: string;
  validation: string;
}

export interface UserTabsInfo {
  name: string;
  label: string;
  icon_class: string;
}

export interface DashboardInfo {
  name: string;
  label: string;
  icon_class: string;
}
