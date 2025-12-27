import http from "@/shared/api/http"
import API from "@/shared/api/path"
import { BaseResponse } from "../interface/base-interface"
import * as iO from "../interface/order-interface"

export const orderService = {
    getAll(page?: number, limit?: number, fieldName?: string, value?: string) {
        const params = new URLSearchParams();

        if (page !== undefined) params.append('page', String(page));
        if (limit !== undefined) params.append('limit', String(limit));
        if (fieldName && value) {
            params.append(fieldName, value);
        }

        const queryString = params.toString();

        return http.get<BaseResponse<iO.IOrder[]>>(
            `${API.ORDER_GETALL}?${queryString}`
        );
    },

    getBy(id: string) {
        return http.get<BaseResponse<iO.IOrder>>(API.ORDER_GETBY(id))
    },

    create(body: iO.CreateOrderPayload) {
        return http.post<BaseResponse<iO.IOrder>>(API.ORDER_CREATE, body)
    },

    createMany(body: iO.CreateOrderPayload[]) {
        return http.post<BaseResponse<iO.IOrder[]>>(API.ORDER_CREATE_MANY, body)
    },

    update(id: string, body: iO.UpdateOrderPayload) {
        return http.put<BaseResponse<iO.IOrder>>(API.ORDER_UPDATE(id), body)
    },

    delete(id: string, soft: boolean = true) {
        return http.delete<BaseResponse<iO.IOrder>>(API.ORDER_DELETE(id) + `${soft ? '' : '?soft=false'}`)
    },

    changeStatus(id: string) {
        return http.put<BaseResponse<iO.IOrder>>(API.ORDER_CHANGESTATUS(id))
    },
}