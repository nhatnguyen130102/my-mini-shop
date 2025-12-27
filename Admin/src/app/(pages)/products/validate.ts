import * as yup from 'yup';

export const initalProductValue = {
    name: "",
    categoryId: "",
    colorId: "",
    materialId: "",
    sizeId: "",
    description: "",
    isActive: true,
    price: 0.0,
};

export const ProductValueSchema = yup.object({
    name: yup
        .string()
        .required("Name is required"),

    price: yup
        .number()
        .min(0, "Price must be greater than 0")
        .required("Price is required"),

    description: yup
        .string()
        .max(255, "Description too long"),

    categoryId: yup
        .string()
        .required("Category is required"),

    colorId: yup
        .string()
        .required("Color is required"),

    sizeId: yup
        .string()
        .required("Size is required"),

    materialId: yup
        .string()
        .required("Material is required"),
});
