import { string, object } from "yup";

const VALIDATE_SIGNUP = "VALIDATE_SIGNUP";

const userSchema = object().shape({
  email: string()
    .required("Email is required")
    .email("Email must be a valid email"),
  password: string()
    .required("Password is required")
    .when("$method", (method, schema) => {
      return method === VALIDATE_SIGNUP
        ? schema.min(8, "Password should be at least 8 characters.")
        : schema;
    }),
  username: string()
    .required("Username is required"),
  role: string()
    .required("Please select a role from the list."),
});

export { userSchema, VALIDATE_SIGNUP };
