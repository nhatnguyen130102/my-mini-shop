import * as yup from 'yup';

export const initalSidebarValue = {
    name: "",
    iconId: "",
    parentId: "",
    path: "",
    description: "",
    isActive: true,
};

export const sidebarValueSchema = yup.object({
    name: yup.string()
        .required("Name is required") // trim để loại bỏ spacing đầu cuối 
        .trim("No leading or trailing spaces") // regex: không cho số 
        .matches(/^[^0-9]*$/, "Name must not contain numbers") // regex: không cho >2 khoảng trắng liên tiếp 
        .matches(/^(?!.*\s{3,}).*$/, "Name must not contain more than 2 consecutive spaces") // regex: phải có ít nhất 1 chữ cái 
        .matches(/.*[A-Za-z].*/, "Name must contain at least one letter"),
    path: yup.string()
        .trim("No leading or trailing spaces") // regex: không cho số 
        .matches(/^[^0-9]*$/, "Path must not contain numbers") // regex: không cho >2 khoảng trắng liên tiếp 
        .matches(/^(?!.*\s{3,}).*$/, "Path must not contain more than 2 consecutive spaces") // regex: phải có ít nhất 1 chữ cái 
        .matches(/.*[A-Za-z].*/, "Path must contain at least one letter"),

    iconId: yup
        .string()
        .required("Icon is required"),

    parentId: yup
        .string()
});
