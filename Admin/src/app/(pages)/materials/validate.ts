import * as yup from 'yup';

export const initalMaterialValue = {
    name: "",
    description: "",
    isActive: true,
};

export const materialValueSchema = yup.object({
    name: yup
        .string()
        .required("Name is required"),
    description: yup.string()
});
