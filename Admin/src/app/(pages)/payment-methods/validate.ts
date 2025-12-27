import * as yup from 'yup';

export const initalPaymentMethodValue = {
    description: "",
    isActive: false,
    name: "",
};

export const paymentMethodValueSchema = yup.object({
    name: yup
        .string()
        .required("Tên phương thức đặt hàng là bắt buộc")
        .min(2, "Tên phải có ít nhất 2 ký tự")
        .max(50, "Tên không được vượt quá 50 ký tự"),

    description: yup
        .string()
        .nullable()
        .max(255, "Mô tả không được vượt quá 255 ký tự"),

    isActive: yup
        .boolean()
        .default(false),
});
