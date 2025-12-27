import http from "@/shared/api/http"
import API from "@/shared/api/path"
import { BaseResponse } from "../interface/base-interface"
import * as iPM from "../interface/payment-method-interface"

export const paymentMethodService = {
    getAll(page?: number, limit?: number, fieldName?: string, value?: string) {
        const params = new URLSearchParams();

        if (page !== undefined) params.append('page', String(page));
        if (limit !== undefined) params.append('limit', String(limit));
        if (fieldName && value) {
            params.append(fieldName, value);
        }

        const queryString = params.toString();

        return http.get<BaseResponse<iPM.IPaymentMethod[]>>(
            `${API.PAYMENTMETHOD_GETALL}?${queryString}`
        );
    },

    getBy(id: string) {
        return http.get<BaseResponse<iPM.IPaymentMethod>>(API.PAYMENTMETHOD_GETBY(id))
    },

    create(body: iPM.CreatePaymentMethodPayload) {
        return http.post<BaseResponse<iPM.IPaymentMethod>>(API.PAYMENTMETHOD_CREATE, body)
    },

    createMany(body: iPM.CreatePaymentMethodPayload[]) {
        return http.post<BaseResponse<iPM.IPaymentMethod[]>>(API.PAYMENTMETHOD_CREATE_MANY, body)
    },

    update(id: string, body: iPM.UpdatePaymentMethodPayload) {
        return http.put<BaseResponse<iPM.IPaymentMethod>>(API.PAYMENTMETHOD_UPDATE(id), body)
    },

    delete(id: string, soft: boolean = true) {
        return http.delete<BaseResponse<iPM.IPaymentMethod>>(API.PAYMENTMETHOD_DELETE(id) + `${soft ? '' : '?soft=false'}`)
    },

    changeStatus(id: string) {
        return http.put<BaseResponse<iPM.IPaymentMethod>>(API.PAYMENTMETHOD_CHANGESTATUS(id))
    },
}