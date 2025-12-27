import * as yup from 'yup';

export const initalColorValue = {
    name: "",
    colorCode: "",
    description: "",
    isActive: true,
};

export const ColorValueSchema = yup.object({
    name: yup
        .string()
        .required("Name is required"),

    colorCode: yup
        .string()
        .required("Color code is required")
        .transform((value) => {
            // nếu người dùng nhập thiếu # thì tự thêm
            if (value && !value.startsWith("#")) {
                return `#${value}`;
            }
            return value;
        })
        .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Color code must be a valid hex"),
});
