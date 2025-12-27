export const isClientSide = () => typeof window !== "undefined";
export const getSessionToken = () => {
    if (typeof window === "undefined") return null;
    let token = sessionStorage.getItem("SESSION_TOKEN");
    if (!token) {
        token = localStorage.getItem("SESSION_TOKEN");
        if (token) {
            sessionStorage.setItem("SESSION_TOKEN", token);
        }
    }
    return token;
};

export const setSessionToken = (value: string) => {
    if (typeof window === "undefined") return;
    sessionStorage.setItem("SESSION_TOKEN", value);
    localStorage.setItem("SESSION_TOKEN", value);
};

export const removeSessionToken = () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("SESSION_TOKEN");
    sessionStorage.removeItem("SESSION_TOKEN");
};

export const getSessionKey = () =>
    sessionStorage.getItem("SESSION_KEY");
export const removeSessionKey = () =>
    sessionStorage.removeItem("SESSION_KEY");
export const setSessionKey = (value: string) =>
    sessionStorage.setItem("SESSION_KEY", value);

export const getSessionTokenExpiresIn = () =>
    sessionStorage.getItem("SESSION_TOKEN_EXPIRES_IN");
export const removeSessionTokenExpiresIn = () =>
    sessionStorage.removeItem("SESSION_TOKEN_EXPIRES_IN");
export const setSessionTokenExpiresIn = (value: string) =>
    sessionStorage.setItem("SESSION_TOKEN_EXPIRES_IN", value);

export const getSessionUserId = () => sessionStorage.getItem("SESSION_USER_ID");
export const removeSessionUserId = () =>
    sessionStorage.removeItem("SESSION_USER_ID");
export const setSessionUserId = (value: string) =>
    sessionStorage.setItem("SESSION_USER_ID", value);

export const getSessionUserEmail = () =>
    sessionStorage.getItem("SESSION_USER_EMAIL");
export const removeSessionUserEmail = () =>
    sessionStorage.removeItem("SESSION_USER_EMAIL");
export const setSessionUserEmail = (value: string) =>
    sessionStorage.setItem("SESSION_USER_EMAIL", value);

export const getSessionUserPassword = () =>
    sessionStorage.getItem("SESSION_USER_PASSWORD");
export const removeSessionUserPassword = () =>
    sessionStorage.removeItem("SESSION_USER_PASSWORD");
export const setSessionUserPassword = (value: string) =>
    sessionStorage.setItem("SESSION_USER_PASSWORD", value);

export const getSessionRememberMe = () =>
    sessionStorage.getItem("SESSION_REMEMBERME");
export const removeSessionRememberMe = () =>
    sessionStorage.removeItem("SESSION_REMEMBERME");
export const setSessionRememberMe = (value: string) =>
    sessionStorage.setItem("SESSION_REMEMBERME", value);

export const getSessionRowsPerPage = () =>
    sessionStorage.getItem("SESSION_ROWS_PER_PAGE");
export const removeSessionRowsPerPage = () =>
    sessionStorage.removeItem("SESSION_ROWS_PER_PAGE");
export const setSessionRowsPerPage = (value: string) =>
    sessionStorage.setItem("SESSION_ROWS_PER_PAGE", value);

export const getSessionSearchQuery = () =>
    sessionStorage.getItem("SESSION_SEARCH_QUERY");
export const removeSessionSearchQuery = () =>
    sessionStorage.removeItem("SESSION_SEARCH_QUERY");
export const setSessionSearchQuery = (value: string) =>
    sessionStorage.setItem("SESSION_SEARCH_QUERY", value);

export const getSessionFilter = () => sessionStorage.getItem("SESSION_FILTER");
export const removeSessionFilter = () =>
    sessionStorage.removeItem("SESSION_FILTER");
export const setSessionFilter = (value: string) =>
    sessionStorage.setItem("SESSION_FILTER", value);

export const getSessionSidebarState = () =>
    sessionStorage.getItem("SESSION_SIDEBAR_STATE");
export const setSessionSidebarState = (value: string) =>
    sessionStorage.setItem("SESSION_SIDEBAR_STATE", value);
export const removeSessionSidebarState = () =>
    sessionStorage.removeItem("SESSION_SIDEBAR_STATE");


export const removeSidebarStateSession = () =>
    sessionStorage.removeItem("SESSION_SIDEBAR_STATE_TYPE");
export const saveSidebarStateToSession = (state: any) => {
    removeSidebarStateSession();
    sessionStorage.setItem("SESSION_SIDEBAR_STATE_TYPE", JSON.stringify(state));
};

export const getSidebarStateFromSession = (): any => {
    try {
        const savedState = sessionStorage.getItem("SESSION_SIDEBAR_STATE_TYPE");
        return savedState ? JSON.parse(savedState) : null;
    } catch (error) {
        return null;
    }
};



export const getSessionLanguageState = () => {
    if (typeof window !== "undefined") {
        return sessionStorage.getItem("SESSION_LANGUAGE_STATE") || "en";
    }
    return "en";
} //------


export const setSessionLanguageState = (value: string) =>
    sessionStorage.setItem("SESSION_LANGUAGE_STATE", value);
export const removeSessionLanguageState = () =>
    sessionStorage.removeItem("SESSION_LANGUAGE_STATE");

export const getSessionCurrencyState = () => {
    if (typeof window !== "undefined") return sessionStorage.getItem("SESSION_CURRENCY_STATE") || 'VND';
    return null;
}
export const setSessionCurrencyState = (value: string) => {
    if (typeof window !== "undefined") return sessionStorage.setItem("SESSION_CURRENCY_STATE", value);

}
export const removeSessionCurrencyState = () =>
    sessionStorage.removeItem("SESSION_CURRENCY_STATE");

export const getSessionCashierState = () => {
    if (typeof window !== "undefined") {
        return sessionStorage.getItem("SESSION_CASHIER_STATE");
    }
    return null;
};

export const setSessionCashierState = (value: string) => {
    if (typeof window !== "undefined") {
        sessionStorage.setItem("SESSION_CASHIER_STATE", value);
    }
};

export const removeSessionCashierState = () => {
    if (typeof window !== "undefined") {
        sessionStorage.removeItem("SESSION_CASHIER_STATE");
    }
};


export const THEME_STORAGE_KEY = "SESSION_THEME_STATE";

export const getSessionThemeState = (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(THEME_STORAGE_KEY) || sessionStorage.getItem(THEME_STORAGE_KEY);
};

export const setSessionThemeState = (value: string): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(THEME_STORAGE_KEY, value);
    sessionStorage.removeItem(THEME_STORAGE_KEY);
};

export const removeSessionThemeState = (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(THEME_STORAGE_KEY);
    sessionStorage.removeItem(THEME_STORAGE_KEY);
};

export const saveSessionOrderStatus = (data: any) => {
    if (typeof window !== "undefined") sessionStorage.setItem('orderStatus', JSON.stringify(data));
};

export const getSessionOrderStatus = () => {
    if (typeof window !== "undefined") {
        const savedStatus = sessionStorage.getItem("orderStatus");
        return savedStatus ? JSON.parse(savedStatus) : 0;
    }
};

export const removeSessionOrderStatus = () => {
    if (typeof window !== "undefined") sessionStorage.removeItem("orderStatus");
};

export const saveSessionOrderStatusFilter = (data: any) => {
    if (typeof window !== "undefined") sessionStorage.setItem('orderStatusFilter', JSON.stringify(data));
};

export const getSessionOrderStatusFilter = () => {
    if (typeof window !== "undefined") {
        const savedStatus = sessionStorage.getItem("orderStatusFilter");
        return savedStatus ? JSON.parse(savedStatus) : 0;
    }
};

export const removeSessionOrderStatusFilter = () => {
    if (typeof window !== "undefined") sessionStorage.removeItem("orderStatusFilter");
};
