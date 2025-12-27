import * as yup from 'yup';

export const initalRoleValue = {
    name: "",
    description: "",
    permission: "",
    isActive: true,
};

export const roleValueSchema = yup.object({
    name: yup
        .string()
        .required("Name is required"),
});
