import http from "@/shared/api/http"
import API from "@/shared/api/path"
import { BaseResponse } from "../interface/base-interface"
import * as iU from "../interface/user-interface"

export const userService = {
    getAll(page?: number, limit?: number, fieldName?: string, value?: string) {
        const params = new URLSearchParams();

        if (page !== undefined) params.append('page', String(page));
        if (limit !== undefined) params.append('limit', String(limit));
        if (fieldName && value) {
            params.append(fieldName, value);
        }

        const queryString = params.toString();

        return http.get<BaseResponse<iU.IUser[]>>(
            `${API.USER_GETALL}?${queryString}`
        );
    },

    getBy(id: string) {
        return http.get<BaseResponse<iU.IUser>>(API.USER_GETBY(id))
    },

    create(body: iU.CreateUserPayload) {
        return http.post<BaseResponse<iU.IUser>>(API.USER_CREATE, body)
    },

    createMany(body: iU.CreateUserPayload[]) {
        return http.post<BaseResponse<iU.IUser[]>>(API.USER_CREATE_MANY, body)
    },

    update(id: string, body: iU.UpdateUserPayload) {
        return http.put<BaseResponse<iU.IUser>>(API.USER_UPDATE(id), body)
    },

    delete(id: string, soft: boolean = true) {
        return http.delete<BaseResponse<iU.IUser>>(API.USER_DELETE(id) + `${soft ? '' : '?soft=false'}`)
    },
    changeStatus(id: string) {
        return http.put<BaseResponse<iU.IUser>>(API.USER_CHANGESTATUS(id))
    },
}