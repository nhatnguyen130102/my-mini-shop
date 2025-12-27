import http from "@/shared/api/http"
import API from "@/shared/api/path"
import { BaseResponse } from "../interface/base-interface"
import * as iCart from "../interface/cart-interface"

export const cartService = {
    getAll(page?: number, limit?: number, fieldName?: string, value?: string) {
        const params = new URLSearchParams();

        if (page !== undefined) params.append('page', String(page));
        if (limit !== undefined) params.append('limit', String(limit));
        if (fieldName && value) {
            params.append(fieldName, value);
        }

        const queryString = params.toString();

        return http.get<BaseResponse<iCart.ICart[]>>(
            `${API.CART_GETALL}?${queryString}`
        );
    },

    getBy(id: string) {
        return http.get<BaseResponse<iCart.ICart>>(API.CART_GETBY(id))
    },

    create(body: iCart.CreateCartPayload) {
        return http.post<BaseResponse<iCart.ICart>>(API.CART_CREATE, body)
    },

    createMany(body: iCart.CreateCartPayload[]) {
        return http.post<BaseResponse<iCart.ICart[]>>(API.CART_CREATE_MANY, body)
    },

    update(id: string, body: iCart.UpdateCartPayload) {
        return http.put<BaseResponse<iCart.ICart>>(API.CART_UPDATE(id), body)
    },

    delete(id: string, soft: boolean = true) {
        return http.delete<BaseResponse<iCart.ICart>>(API.CART_DELETE(id) + `${soft ? '' : '?soft=false'}`)
    },

    changeStatus(id: string) {
        return http.put<BaseResponse<iCart.ICart>>(API.CART_CHANGESTATUS(id))
    },
}