import * as yup from "yup";

export default yup.object().shape({
    username: yup
        .string()
        .required("Username is required")
        .min(4, "Username must be more than 3 characters"),
    password: yup
        .string()
        .required("Password is required")
        .min(7, "Password  must be more than 7 characters"),
});