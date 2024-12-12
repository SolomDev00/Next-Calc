import * as yup from "yup";

export const registerSchema = yup
  .object({
    name: yup
      .string()
      .required("Username is required!")
      .min(3, "Username should be at least 3 characters!"),
    phone: yup.string().optional(),
    email: yup
      .string()
      .required("Email is required!")
      .matches(/^[^@]+@[^@]+\.[^@ .]{2,}$/, "Email address is not Valid!"),
    password: yup
      .string()
      .required("Password is required!")
      .min(6, "Password should be at least 6 characters!"),
    password_confirmation: yup
      .string()
      .required("Password confirmation is required!")
      .oneOf([yup.ref("password")], "Passwords must match"),
    country: yup
    .string()
    .optional()
    .min(3, "Country should be at least 3 characters!"),
  })
  .required();

export const loginSchema = yup
  .object({
    email: yup
      .string()
      .required("Email is required!")
      .matches(/^[^@]+@[^@]+\.[^@ .]{2,}$/, "Email address is not Valid!"),
    password: yup
      .string()
      .required("Password is required!")
      .min(6, "Password should be at least 6 characters!"),
  })
  .required();

export const forgetSchema = yup
  .object({
    email: yup
      .string()
      .required("Email is required!")
      .matches(/^[^@]+@[^@]+\.[^@ .]{2,}$/, "Email address is not Valid!"),
  })
  .required();

export const resetSchema = yup
  .object({
    password: yup
      .string()
      .required("Password is required!")
      .min(6, "Password should be at least 6 characters!"),
    password_confirmation: yup
      .string()
      .required("Password confirmation is required!")
      .oneOf([yup.ref("password")], "Passwords must match"),
  })
  .required();
