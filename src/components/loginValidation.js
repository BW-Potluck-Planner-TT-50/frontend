import * as yup from "yup";

export default yup.object().shape({
    username: yup
        .string()
        .required("a username is required")
        .min(4, "your username must be more than 3 characters!"),
    password: yup
        .string()
        .required("an email address is required")
        .min(7, "your password  must be more than 3 characters!"),
});