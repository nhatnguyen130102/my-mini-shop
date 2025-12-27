import http from "@/shared/api/http"
import API from "@/shared/api/path"
import { BaseResponse } from "../interface/base-interface"
import * as sidebar from "../interface/sidebar-interface"

export const sidebarService = {
    getAll(page?: number, limit?: number, fieldName?: string, value?: string) {
        const params = new URLSearchParams();

        if (page !== undefined) params.append('page', String(page));
        if (limit !== undefined) params.append('limit', String(limit));
        if (fieldName && value) {
            params.append(fieldName, value);
        }
        params.append("sort", "createdAt:desc")
        const queryString = params.toString();

        return http.get<BaseResponse<sidebar.ISidebar[]>>(
            `${API.SIDEBAR_GETALL}?${queryString}`
        );
    },

    getBy(id: string) {
        return http.get<BaseResponse<sidebar.ISidebar>>(API.SIDEBAR_GETBY(id))
    },

    create(body: sidebar.CreateSidebarPayload) {
        return http.post<BaseResponse<sidebar.ISidebar>>(API.SIDEBAR_CREATE, body)
    },

    createMany(body: sidebar.CreateSidebarPayload[]) {
        return http.post<BaseResponse<sidebar.ISidebar[]>>(API.SIDEBAR_CREATE_MANY, body)
    },

    update(id: string, body: sidebar.UpdateSidebarPayload) {
        return http.put<BaseResponse<sidebar.ISidebar>>(API.SIDEBAR_UPDATE(id), body)
    },

    delete(id: string, soft: boolean = true) {
        return http.delete<BaseResponse<sidebar.ISidebar>>(API.SIDEBAR_DELETE(id) + `${soft ? '' : '?soft=false'}`)
    },
    changeStatus(id: string) {
        return http.put<BaseResponse<sidebar.ISidebar>>(API.SIDEBAR_CHANGESTATUS(id))
    },
}