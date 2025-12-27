import http from "@/shared/api/http"
import API from "@/shared/api/path"
import { BaseResponse } from "../interface/base-interface"
import * as iPr from "../interface/product-interface"

export const sizeService = {
    getAll(page?: number, limit?: number, fieldName?: string, value?: string) {
        const params = new URLSearchParams();

        if (page !== undefined) params.append('page', String(page));
        if (limit !== undefined) params.append('limit', String(limit));
        if (fieldName && value) {
            params.append(fieldName, value);
        }

        const queryString = params.toString();

        return http.get<BaseResponse<iPr.ISize[]>>(
            `${API.SIZE_GETALL}?${queryString}`
        );
    },

    getBy(id: string) {
        return http.get<BaseResponse<iPr.ISize>>(API.SIZE_GETBY(id))
    },

    create(body: iPr.CreateSizePayload) {
        return http.post<BaseResponse<iPr.ISize>>(API.SIZE_CREATE, body)
    },

    createMany(body: iPr.CreateSizePayload[]) {
        return http.post<BaseResponse<iPr.ISize[]>>(API.SIZE_CREATE_MANY, body)
    },

    update(id: string, body: iPr.UpdateSizePayload) {
        return http.put<BaseResponse<iPr.ISize>>(API.SIZE_UPDATE(id), body)
    },

    delete(id: string, soft: boolean = true) {
        return http.delete<BaseResponse<iPr.ISize>>(API.SIZE_DELETE(id) + `${soft ? '' : '?soft=false'}`)
    },
    changeStatus(id: string) {
        return http.put<BaseResponse<iPr.ISize>>(API.SIZE_CHANGESTATUS(id))
    },
}