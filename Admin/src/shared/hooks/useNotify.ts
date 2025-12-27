'use client'
import { toast } from "sonner";

type NotifyOptions = {
    success?: boolean;
    message?: string;
};

export function useNotify() {
    const notify = ({ success = true, message = "Success" }: NotifyOptions) => {
        if (success) {
            toast.success(message);
        } else {
            toast.error(message);
        }
    };

    return { notify };
}
