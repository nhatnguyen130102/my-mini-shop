import * as yup from 'yup';

export const initalSizeValue = {
    name: "",
    description: "",
    isActive: true,
};

export const SizeValueSchema = yup.object({
    name: yup
        .string()
        .required("Name is required"),
});
