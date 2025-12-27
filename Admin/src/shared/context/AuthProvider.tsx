// context/AuthContext.tsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import http from "../api/http";
import { BaseResponse } from "@/common/interface/base-interface";
import { IUser } from "@/common/interface/user-interface";
import API from "../api/path";
import { getSessionToken, removeSessionToken, setSessionToken } from "@/common/utils/utils";

interface AuthContextType {
    user: IUser | null;
    token: string | null;
    login: (token: string, user: IUser) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const checkAuth = async () => {
            if (pathname === "/login" || pathname === "/register") {
                return;
            }

            const savedToken = getSessionToken();
            if (!savedToken || isTokenExpired(savedToken)) {
                alert("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!");
                router.push("/login");
                return;
            }

            setToken(savedToken);

            try {
                const res = await http.get<BaseResponse<IUser>>(API.AUTH_GETME, {
                    headers: { Authorization: `Bearer ${savedToken}` },
                });

                if (res?.payload?.isSuccess) {
                    setUser(res.payload.data);
                    if (pathname === "/" || pathname === "/login" || pathname === "/register") {
                        router.push("/dashboard");
                    }
                } else {
                    router.push("/login");
                }
            } catch (err) {
                console.error("Auth check failed:", err);
                router.push("/login");
            }
        };

        checkAuth();
    }, [router, pathname]);

    const login = (newToken: string, userData: IUser) => {
        setSessionToken(newToken);
        setToken(newToken);
        setUser(userData);
    };

    const logout = () => {
        removeSessionToken();
        setToken(null);
        setUser(null);
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};

// Hàm kiểm tra token hết hạn
function isTokenExpired(token: string): boolean {
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.exp * 1000 < Date.now();
    } catch {
        return true;
    }
}
