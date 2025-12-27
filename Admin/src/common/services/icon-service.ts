import http from "@/shared/api/http"
import API from "@/shared/api/path"
import { BaseResponse } from "../interface/base-interface"
import * as iIcon from "../interface/sidebar-interface"

export const iconService = {
    getAll(page?: number, limit?: number, fieldName?: string, value?: string) {
        const params = new URLSearchParams();

        if (page !== undefined) params.append('page', String(page));
        if (limit !== undefined) params.append('limit', String(limit));
        if (fieldName && value) {
            params.append(fieldName, value);
        }

        const queryString = params.toString();

        return http.get<BaseResponse<iIcon.IIcon[]>>(
            `${API.ICON_GETALL}?${queryString}`
        );
    },

    getBy(id: string) {
        return http.get<BaseResponse<iIcon.IIcon>>(API.ICON_GETBY(id))
    },

    create(body: iIcon.CreateIconPayload) {
        return http.post<BaseResponse<iIcon.IIcon>>(API.ICON_CREATE, body)
    },

    createMany(body: iIcon.CreateIconPayload[]) {
        return http.post<BaseResponse<iIcon.IIcon[]>>(API.ICON_CREATE_MANY, body)
    },

    update(id: string, body: iIcon.UpdateIconPayload) {
        return http.put<BaseResponse<iIcon.IIcon>>(API.ICON_UPDATE(id), body)
    },

    delete(id: string, soft: boolean = true) {
        return http.delete<BaseResponse<iIcon.IIcon>>(API.ICON_DELETE(id) + `${soft ? '' : '?soft=false'}`)
    },
    changeStatus(id: string) {
        return http.put<BaseResponse<iIcon.IIcon>>(API.ICON_CHANGESTATUS(id))
    },
}