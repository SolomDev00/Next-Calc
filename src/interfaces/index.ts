/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IRegisterInput {
  name:
    | "name"
    | "email"
    | "phone"
    | "password"
    | "password_confirmation"
    | "country";
  placeholder: string;
  type: string;
  forl: string;
  placel: string;
  validation?: {
    pattern?: RegExp;
    required?: boolean;
    minLength?: number;
  };
}

export interface ILoginInput {
  name: "email" | "password";
  placeholder: string;
  type: string;
  forl: string;
  placel: string;
  validation: {
    pattern?: RegExp;
    required?: boolean;
    minLength?: number;
  };
}

export interface IForgetInput {
  name: "email";
  placeholder: string;
  type: string;
  forl: string;
  placel: string;
  validation: {
    pattern?: RegExp;
    required?: boolean;
    minLength?: number;
  };
}

export interface IResetInput {
  name: "password" | "password_confirmation";
  placeholder: string;
  type: string;
  forl: string;
  placel: string;
  validation: {
    pattern?: RegExp;
    required?: boolean;
    minLength?: number;
  };
}

export interface IErrorResponse {
  status?: number;
  message?: string;
  error: {
    message?: string;
    details?: {
      message?: string;
    };
  };
  errors: {
    name?: string[] | undefined;
    email?: string[] | undefined;
    phone?: string[] | undefined;
    country?: string[] | undefined;
    password?: string[] | undefined;
    password_confirmation?: string[] | undefined;
    [key: string]: string[] | undefined;
  };
}

export interface IUser {
  id: number;
  name: string;
  image: string;
  address: string;
  email: string;
  phone: string;
  balance: string;
  will_expire: string;
  email_verified_at: string;
  last_login_at: string;
  client_secret: string;
  sms_alert: number;
  plan_id: number;
}

export interface IToken {
  groups: string[];
  contacts: string[];
  senderids: string[];
  templates: string[];
  access_token: string;
  user: IUser;
}

export interface IContact {
  id: number | null;
  name: string | null;
  email: string | null;
  number: string | null;
  status: string | null;
  created_at: string | null;
  updated_at: string | null;
  user_id: number | null;
  group_id: number | null;
}

export interface IGroup {
  id: number;
  user_id: number;
  name: string;
  status: number;
  created_at: string;
  updated_at: string;
  contacts: Array<any>;
}

export interface ISender {
  id: number;
  user_id: number;
  sender: string;
  type: string;
  status: number;
  created_at: string;
  updated_at: string;
}

export interface ITemplates {
  id: number;
  user_id: number;
  name: string;
  text: string;
  status: number;
  created_at: string;
  updated_at: string;
}
