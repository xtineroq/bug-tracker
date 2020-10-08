import { string, object } from "yup";

const userLoginSchema = object().shape({
  email: string()
    .required("Email is required.")
    .email("Email must be a valid email."),
  password: string().required("Password is required."),
});

const userSignUpSchema = object().shape({
  email: string()
    .required("Email is required.")
    .email("Email must be a valid email."),
  password: string()
    .required("Password is required.")
    .min(8, "Password should be at least 8 characters."),
  username: string().required("Username is required."),
  role: string().required("Please select a role from the list."),
});

export { userLoginSchema, userSignUpSchema };
