import http from "@/shared/api/http"
import API from "@/shared/api/path"
import { BaseResponse } from "../interface/base-interface"
import * as iPr from "../interface/product-interface"

export const colorService = {
    getAll(page?: number, limit?: number, fieldName?: string, value?: string) {
        const params = new URLSearchParams();

        if (page !== undefined) params.append('page', String(page));
        if (limit !== undefined) params.append('limit', String(limit));
        if (fieldName && value) {
            params.append(fieldName, value);
        }

        const queryString = params.toString();

        return http.get<BaseResponse<iPr.IColor[]>>(
            `${API.COLOR_GETALL}?${queryString}`
        );
    },

    getBy(id: string) {
        return http.get<BaseResponse<iPr.IColor>>(API.COLOR_GETBY(id))
    },

    create(body: iPr.CreateColorPayload) {
        return http.post<BaseResponse<iPr.IColor>>(API.COLOR_CREATE, body)
    },

    createMany(body: iPr.CreateColorPayload[]) {
        return http.post<BaseResponse<iPr.IColor[]>>(API.COLOR_CREATE_MANY, body)
    },

    update(id: string, body: iPr.UpdateColorPayload) {
        return http.put<BaseResponse<iPr.IColor>>(API.COLOR_UPDATE(id), body)
    },

    delete(id: string, soft: boolean = true) {
        return http.delete<BaseResponse<iPr.IColor>>(API.COLOR_DELETE(id) + `${soft ? '' : '?soft=false'}`)
    },

    changeStatus(id: string) {
        return http.put<BaseResponse<iPr.IColor>>(API.COLOR_CHANGESTATUS(id))
    },
}