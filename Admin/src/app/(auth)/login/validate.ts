import * as yup from 'yup';

export const initalLoginValue = {
    email: "",
    password: "",
};

export const loginValueSchema = yup.object({
    email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required"),

    password: yup
        .string()
        .required("Password is required"),
});
