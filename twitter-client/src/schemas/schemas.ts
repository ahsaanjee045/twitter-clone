import * as yup from "yup";

export const registerSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(4, "Username must be at least 4 characters")
    .max(40, "Username must be at most 40 characters")
    .matches(
      /^[a-zA-Z\s]+$/,
      "Enter a valid Username. Only Alphabets and spaces are allowed"
    ),
  email: yup
    .string()
    .required("Email is required")
    .email("Not a valid email address"),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Please Enter a valid password"
    ),
  confirm: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Not a valid email address"),
});
