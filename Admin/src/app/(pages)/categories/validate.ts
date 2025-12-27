import * as yup from 'yup';

export const initalCategoryValue = {
    name: "",
    description: "",
    isActive: true,
};

export const CategoryValueSchema = yup.object({
    name: yup
        .string()
        .required("Name is required"),
});
