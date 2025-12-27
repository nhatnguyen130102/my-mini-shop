import { useEffect, useState } from "react";

/**
 * Hook debounce: trả về giá trị sau khi người dùng ngừng nhập một khoảng thời gian
 * @param value Giá trị gốc (ví dụ: input search)
 * @param delay Thời gian chờ (ms)
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // cleanup nếu value thay đổi trước khi hết delay
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}
