import * as yup from 'yup';

export const initalIconValue = {
    name: "",
    description: "",
    iconName: "",
    isActive: true,
};

export const iconValueSchema = yup.object({
    name: yup
        .string()
        .required("Name is required"),

    iconName: yup
        .string()
        .required("Icon-Name is required"),

    description: yup.string()
});
