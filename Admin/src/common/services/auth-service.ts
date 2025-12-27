import http from "@/shared/api/http"
import API from "@/shared/api/path"
import { BaseResponse } from "../interface/base-interface"
import { IAuth, IUser, LoginPayload, RegisterPayload } from "../interface/user-interface"

export const authService = {
    login(body: LoginPayload) {
        return http.post<BaseResponse<IAuth>>(API.AUTH_LOGIN, body)
    },

    register(body: RegisterPayload) {
        return http.post<BaseResponse<IUser>>(API.AUTH_REGISTER, body)
    },

    getMe() {
        return http.get<BaseResponse<IUser>>(API.AUTH_GETME)
    }
}