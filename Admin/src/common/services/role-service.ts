import http from "@/shared/api/http"
import API from "@/shared/api/path"
import { BaseResponse } from "../interface/base-interface"
import * as iR from "../interface/role-interface"

export const roleService = {
    getAll(page?: number, limit?: number, fieldName?: string, value?: string) {
        const params = new URLSearchParams();

        if (page !== undefined) params.append('page', String(page));
        if (limit !== undefined) params.append('limit', String(limit));
        if (fieldName && value) {
            params.append(fieldName, value);
        }

        const queryString = params.toString();

        return http.get<BaseResponse<iR.IRole[]>>(
            `${API.ROLE_GETALL}?${queryString}`
        );
    },

    getBy(id: string) {
        return http.get<BaseResponse<iR.IRole>>(API.ROLE_GETBY(id))
    },

    create(body: iR.CreateRolePayload) {
        return http.post<BaseResponse<iR.IRole>>(API.ROLE_CREATE, body)
    },

    createMany(body: iR.CreateRolePayload[]) {
        return http.post<BaseResponse<iR.IRole[]>>(API.ROLE_CREATE_MANY, body)
    },

    update(id: string, body: iR.UpdateRolePayload) {
        return http.put<BaseResponse<iR.IRole>>(API.ROLE_UPDATE(id), body)
    },

    delete(id: string, soft: boolean = true) {
        return http.delete<BaseResponse<iR.IRole>>(API.ROLE_DELETE(id) + `${soft ? '' : '?soft=false'}`)
    },
    changeStatus(id: string) {
        return http.put<BaseResponse<iR.IRole>>(API.ROLE_CHANGESTATUS(id))
    },
}