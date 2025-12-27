import {
    getSessionToken,
    isClientSide,
    removeSessionToken,
    removeSessionTokenExpiresIn,
} from "@/common/utils/utils";

type CustomOptions = Omit<RequestInit, "method"> & {
    baseUrl?: string;
    body?: any;
};

export interface ApiResponse<T = any> {
    statusCode: number;
    payload: T | null;
    ok: boolean;
}

export async function request<T>(
    method: "GET" | "POST" | "PUT" | "DELETE",
    url: string,
    options: CustomOptions = {}
): Promise<ApiResponse<T>> {
    let body: BodyInit | undefined;

    if (options.body instanceof FormData) {
        body = options.body;
    } else if (options.body !== undefined) {
        body = JSON.stringify(options.body);
    }

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    const token = getSessionToken();
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const baseUrl = "http://localhost:5000";
    const fullUrl = url.startsWith("/") ? `${baseUrl}${url}` : `${baseUrl}/${url}`;

    try {
        const res = await fetch(fullUrl, {
            ...options,
            method,
            headers,
            body,
        });

        const payload = (await res.json().catch(() => null)) as T;

        if (res.ok) {
            return { statusCode: res.status, payload, ok: true };
        }

        if (res.status === 401) {
            removeSessionToken();
            removeSessionTokenExpiresIn?.();
        }

        return { statusCode: res.status, payload, ok: false };
    } catch (error) {
        console.error("HTTP Error:", error);
        return { statusCode: 500, payload: null, ok: false };
    }
}

export const http = {
    get<T>(url: string, options?: Omit<CustomOptions, "body">) {
        return request<T>("GET", url, options);
    },
    post<T>(url: string, body?: any, options?: Omit<CustomOptions, "body">) {
        return request<T>("POST", url, { ...options, body });
    },
    put<T>(url: string, body?: any, options?: Omit<CustomOptions, "body">) {
        return request<T>("PUT", url, { ...options, body });
    },
    delete<T>(url: string, options?: Omit<CustomOptions, "body">) {
        return request<T>("DELETE", url, options);
    },
    deleteWithBody<T>(url: string, body?: any, options?: Omit<CustomOptions, "body">) {
        return request<T>("DELETE", url, { ...options, body });
    },
};

export default http;
