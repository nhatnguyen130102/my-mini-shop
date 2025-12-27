import * as yup from 'yup';

export const initalRegisterValue = {
    email: "",
    password: "",
    compare: "",
    username: "",
};

export const registerValueSchema = yup.object({
    email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required"),

    password: yup
        .string()
        .min(7, "Password must be at least 7 characters")
        .required("Password is required"),

    username: yup
        .string()
        .min(3, "Username must be at least 3 characters")
        .required("Username is required"),

    compare: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required("Please confirm your password"),
});
