import * as yup from "yup";

export default yup.object().shape({
    email: yup
        .string()
        .email()
        .required("Username is required"),
    password: yup
        .string()
        .required("Password is required")
        .min(7, "Password  must be more than 7 characters"),
});