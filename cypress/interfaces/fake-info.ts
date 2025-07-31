export interface fakeEmailOptions {
  provider: string;
  lastname: string;
  firstname: string;
  password_prefix: string;
}

export const defaultFakeEmailOptions: fakeEmailOptions = {
  provider: "rubicotech.in",
  lastname: "rubico",
  firstname: "denver.divyanshu+",
  password_prefix: "R1",
};

export interface fakeCompanyLastName {
  lastname: string;
}

export const defaultCompanyOptions: fakeCompanyLastName = {
  lastname: "Rubico tech",
};

export interface fakeUserName {
  first_name: string;
  last_name: string;
}

export const defaultUserName: fakeUserName = {
  first_name: "Denver",
  last_name: "Divyanshu",
};
