import * as yup from 'yup';

export const initalVoucherValue = {
    description: "",
    isActive: false,
    name: "",
    startDate: "",
    endDate: "",
    status: "",
    type: "", // "percentage" | "amount"
    value: 0,
    minimumOrder: 0,
    maximumDiscount: 0,

};

export const voucherValueSchema = yup.object({
    name: yup
        .string()
        .required("Tên là bắt buộc")
        .min(2, "Tên phải có ít nhất 2 ký tự")
        .max(100, "Tên không được vượt quá 100 ký tự"),
    description: yup
        .string()
        .nullable()
        .max(255, "Mô tả không được vượt quá 255 ký tự"),
    isActive: yup
        .boolean()
        .default(false), startDate: yup
            .date()
            .typeError("Ngày bắt đầu không hợp lệ")
            .required("Ngày bắt đầu là bắt buộc"),
    endDate: yup
        .date()
        .typeError("Ngày kết thúc không hợp lệ")
        .min(yup
            .ref("startDate"), "Ngày kết thúc phải sau ngày bắt đầu")
        .required("Ngày kết thúc là bắt buộc"),
    status: yup
        .string()
        .oneOf(["pending", "active", "expired"], "Trạng thái không hợp lệ")
        .required("Trạng thái là bắt buộc"),
    type: yup
        .string()
        .oneOf(["percentage", "amount"], "Loại phải là percentage hoặc amount")
        .required("Loại là bắt buộc"),
    value: yup
        .number()
        .typeError("Giá trị phải là số")
        .min(0, "Giá trị không được âm")
        .required("Giá trị là bắt buộc"),
    minimumOrder: yup
        .number()
        .typeError("Giá trị phải là số")
        .min(0, "Giá trị không được âm")
        .required("Giá trị là bắt buộc"),
    maximumDiscount: yup
        .number()
        .typeError("Giá trị phải là số")
        .min(0, "Giá trị không được âm")
        .required("Giá trị là bắt buộc"),
});
