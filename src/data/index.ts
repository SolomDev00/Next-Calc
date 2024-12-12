import {
  IForgetInput,
  ILoginInput,
  IRegisterInput,
  IResetInput,
} from "../interfaces";

export const REGISTER_FORM: IRegisterInput[] = [
  {
    name: "name",
    placeholder: "Type your Sender Name ..",
    type: "text",
    forl: "username",
    placel: "Sender Name :",
    validation: {
      required: true,
      minLength: 3,
    },
  },
  {
    name: "email",
    placeholder: "Type your Email ..",
    type: "email",
    forl: "email",
    placel: "Email :",
    validation: {
      required: true,
      pattern: /^[^@]+@[^@]+\.[^@ .]{2,}$/,
    },
  },
  {
    name: "phone",
    placeholder: "Type your Phone number ..",
    type: "text",
    forl: "name",
    placel: "Phone :",
  },
  {
    name: "country",
    placeholder: "Type your Country ..",
    type: "text",
    forl: "country",
    placel: "Country :",
    validation: {
      required: true,
      minLength: 3,
    },
  },
  {
    name: "password",
    placeholder: "Type your Password ..",
    type: "password",
    forl: "password",
    placel: "Password :",
    validation: {
      required: true,
      minLength: 6,
    },
  },
  {
    name: "password_confirmation",
    placeholder: "Type your password Confirmation ..",
    type: "password",
    forl: "password_confirmation",
    placel: "Password Confirmation :",
    validation: {
      required: true,
      minLength: 6,
    },
  },
];

export const LOGIN_FORM: ILoginInput[] = [
  {
    name: "email",
    placeholder: "Type your Email ..",
    type: "email",
    forl: "email",
    placel: "Email :",
    validation: {
      required: true,
      pattern: /^[^@]+@[^@]+\.[^@ .]{2,}$/,
    },
  },
  {
    name: "password",
    placeholder: "Enter your Password ..",
    type: "password",
    forl: "password",
    placel: "Password :",
    validation: {
      required: true,
      minLength: 6,
    },
  },
];

export const FORGET_FORM: IForgetInput[] = [
  {
    name: "email",
    placeholder: "Type your Email ..",
    type: "email",
    forl: "email",
    placel: "Email :",
    validation: {
      required: true,
      pattern: /^[^@]+@[^@]+\.[^@ .]{2,}$/,
    },
  },
];

export const RESET_FORM: IResetInput[] = [
  {
    name: "password",
    placeholder: "Type your Password ..",
    type: "password",
    forl: "password",
    placel: "Password :",
    validation: {
      required: true,
      minLength: 6,
    },
  },
  {
    name: "password_confirmation",
    placeholder: "Type your password Confirmation ..",
    type: "password",
    forl: "password_confirmation",
    placel: "Password Confirmation :",
    validation: {
      required: true,
      minLength: 6,
    },
  },
];
