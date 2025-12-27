import http from "@/shared/api/http"
import API from "@/shared/api/path"
import { BaseResponse } from "../interface/base-interface"
import * as iUR from "../interface/role-interface"

export const userRoleService = {
    getAll(page?: number, limit?: number, fieldName?: string, value?: string) {
        const params = new URLSearchParams();

        if (page !== undefined) params.append('page', String(page));
        if (limit !== undefined) params.append('limit', String(limit));
        if (fieldName && value) {
            params.append(fieldName, value);
        }

        const queryString = params.toString();

        return http.get<BaseResponse<iUR.IUserRole[]>>(
            `${API.USER_ROLE_GETALL}?${queryString}`
        );
    },

    getBy(id: string) {
        return http.get<BaseResponse<iUR.IUserRole>>(API.USER_ROLE_GETBY(id))
    },

    create(body: iUR.CreateUserRolePayload) {
        return http.post<BaseResponse<iUR.IUserRole>>(API.USER_ROLE_CREATE, body)
    },


    update(id: string, body: iUR.UpdateUserRolePayload) {
        return http.put<BaseResponse<iUR.IUserRole>>(API.USER_ROLE_UPDATE(id), body)
    },

    delete(id: string, soft: boolean = true) {
        return http.delete<BaseResponse<iUR.IUserRole>>(API.USER_ROLE_DELETE(id) + `${soft ? '' : '?soft=false'}`)
    },

    deleteMany(body: string[]) {
        return http.post<BaseResponse<iUR.IUserRole>>(API.USER_ROLE_DELETE_MANY, body)
    },


    createMany(body: iUR.CreateUserRolePayload[]) {
        return http.post<BaseResponse<iUR.IUserRole[]>>(API.USER_ROLE_CREATE_MANY, body)
    },

    changeStatus(id: string) {
        return http.put<BaseResponse<iUR.IUserRole>>(API.USER_ROLE_CHANGESTATUS(id))
    },
}