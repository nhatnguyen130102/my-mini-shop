import http from "@/shared/api/http"
import API from "@/shared/api/path"
import { BaseResponse } from "../interface/base-interface"
import * as iPr from "../interface/product-interface"

export const productService = {
    getAll(page?: number, limit?: number, fieldName?: string, value?: string) {
        const params = new URLSearchParams();

        if (page !== undefined) params.append('page', String(page));
        if (limit !== undefined) params.append('limit', String(limit));
        if (fieldName && value) {
            params.append(fieldName, value);
        }

        const queryString = params.toString();

        return http.get<BaseResponse<iPr.IProduct[]>>(
            `${API.PRODUCT_GETALL}?${queryString}`
        );
    },


    getBy(id: string) {
        return http.get<BaseResponse<iPr.IProduct>>(API.PRODUCT_GETBY(id))
    },

    create(body: iPr.CreateProductPayload) {
        return http.post<BaseResponse<iPr.IProduct>>(API.PRODUCT_CREATE, body)
    },

    createMany(body: iPr.CreateProductPayload[]) {
        return http.post<BaseResponse<iPr.IProduct[]>>(API.PRODUCT_CREATE_MANY, body)
    },

    update(id: string, body: iPr.UpdateProductPayload) {
        return http.put<BaseResponse<iPr.IProduct>>(API.PRODUCT_UPDATE(id), body)
    },

    delete(id: string, soft: boolean = true) {
        return http.delete<BaseResponse<iPr.IProduct>>(API.PRODUCT_DELETE(id) + `${soft ? '' : '?soft=false'}`)
    },

    changeStatus(id: string) {
        return http.put<BaseResponse<iPr.IProduct>>(API.PRODUCT_CHANGESTATUS(id))
    },
}