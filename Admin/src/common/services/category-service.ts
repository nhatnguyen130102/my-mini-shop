import http from "@/shared/api/http"
import API from "@/shared/api/path"
import { BaseResponse } from "../interface/base-interface"
import * as iPr from "../interface/product-interface"

export const categoryService = {
    getAll(page?: number, limit?: number, fieldName?: string, value?: string) {
        const params = new URLSearchParams();

        if (page !== undefined) params.append('page', String(page));
        if (limit !== undefined) params.append('limit', String(limit));
        if (fieldName && value) {
            params.append(fieldName, value);
        }

        const queryString = params.toString();

        return http.get<BaseResponse<iPr.IColor[]>>(
            `${API.CATEGORY_GETALL}?${queryString}`
        );
    },

    getBy(id: string) {
        return http.get<BaseResponse<iPr.ICategory>>(API.CATEGORY_GETBY(id))
    },

    create(body: iPr.CreateCategoryPayload) {
        return http.post<BaseResponse<iPr.ICategory>>(API.CATEGORY_CREATE, body)
    },

    createMany(body: iPr.CreateCategoryPayload[]) {
        return http.post<BaseResponse<iPr.ICategory[]>>(API.CATEGORY_CREATE_MANY, body)
    },

    update(id: string, body: iPr.UpdateCategoryPayload) {
        return http.put<BaseResponse<iPr.ICategory>>(API.CATEGORY_UPDATE(id), body)
    },

    delete(id: string, soft: boolean = true) {
        return http.delete<BaseResponse<iPr.ICategory>>(API.CATEGORY_DELETE(id) + `${soft ? '' : '?soft=false'}`)
    },

    changeStatus(id: string) {
        return http.put<BaseResponse<iPr.ICategory>>(API.CATEGORY_CHANGESTATUS(id))
    },
}