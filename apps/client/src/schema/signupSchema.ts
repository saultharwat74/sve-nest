import * as yup from "yup";
export default yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password must not exceed 32 characters")
    .oneOf([yup.ref("confirmPassword")], "Passwords must match"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password must not exceed 32 characters")
    .oneOf([yup.ref("password")], "Passwords must match"),
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
});
