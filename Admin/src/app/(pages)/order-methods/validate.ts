import * as yup from 'yup';

export const initalUserValue = {
    fullname: "",
    email: "",
    username: "",
    description: "",
    isActive: false,
    name: "",
    password: "",
};

export const userValueSchema = yup.object({
    fullname: yup
        .string()
        .required("Full name is required"),

    email: yup
        .string()
        .required("Email is required"),

    username: yup
        .string()
        .required("Username is required"),

    description: yup
        .string(),
});
