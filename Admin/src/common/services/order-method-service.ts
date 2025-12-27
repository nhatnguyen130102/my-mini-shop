import http from "@/shared/api/http"
import API from "@/shared/api/path"
import { BaseResponse } from "../interface/base-interface"
import * as iOM from "../interface/order-method-interface"

export const orderMethodService = {
    getAll(page?: number, limit?: number, fieldName?: string, value?: string) {
        const params = new URLSearchParams();

        if (page !== undefined) params.append('page', String(page));
        if (limit !== undefined) params.append('limit', String(limit));
        if (fieldName && value) {
            params.append(fieldName, value);
        }

        const queryString = params.toString();

        return http.get<BaseResponse<iOM.IOrderMethod[]>>(
            `${API.ORDERMETHOD_GETALL}?${queryString}`
        );
    },

    getBy(id: string) {
        return http.get<BaseResponse<iOM.IOrderMethod>>(API.ORDERMETHOD_GETBY(id))
    },

    create(body: iOM.CreateOrderMethodPayload) {
        return http.post<BaseResponse<iOM.IOrderMethod>>(API.ORDERMETHOD_CREATE, body)
    },

    createMany(body: iOM.CreateOrderMethodPayload[]) {
        return http.post<BaseResponse<iOM.IOrderMethod[]>>(API.ORDERMETHOD_CREATE_MANY, body)
    },

    update(id: string, body: iOM.UpdateOrderMethodPayload) {
        return http.put<BaseResponse<iOM.IOrderMethod>>(API.ORDERMETHOD_UPDATE(id), body)
    },

    delete(id: string, soft: boolean = true) {
        return http.delete<BaseResponse<iOM.IOrderMethod>>(API.ORDERMETHOD_DELETE(id) + `${soft ? '' : '?soft=false'}`)
    },

    changeStatus(id: string) {
        return http.put<BaseResponse<iOM.IOrderMethod>>(API.ORDERMETHOD_CHANGESTATUS(id))
    },
}