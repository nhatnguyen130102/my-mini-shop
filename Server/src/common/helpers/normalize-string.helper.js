// @ts-check

export const normalizeString = (str) => {
    return str
        .normalize("NFD")                // tách dấu
        .replace(/[\u0300-\u036f]/g, "") // xoá dấu
        .toLowerCase();                  // về lowercase
}
