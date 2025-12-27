import http from "@/shared/api/http"
import API from "@/shared/api/path"
import { BaseResponse } from "../interface/base-interface"
import * as iCus from "../interface/customer-interface"

export const customerService = {
    getAll(page?: number, limit?: number, fieldName?: string, value?: string) {
        const params = new URLSearchParams();

        if (page !== undefined) params.append('page', String(page));
        if (limit !== undefined) params.append('limit', String(limit));
        if (fieldName && value) {
            params.append(fieldName, value);
        }

        const queryString = params.toString();

        return http.get<BaseResponse<iCus.ICustomer[]>>(
            `${API.CUSTOMER_GETALL}?${queryString}`
        );
    },

    getBy(id: string) {
        return http.get<BaseResponse<iCus.ICustomer>>(API.CUSTOMER_GETBY(id))
    },

    create(body: iCus.CreateCustomerPayload) {
        return http.post<BaseResponse<iCus.ICustomer>>(API.CUSTOMER_CREATE, body)
    },

    createMany(body: iCus.CreateCustomerPayload[]) {
        return http.post<BaseResponse<iCus.ICustomer[]>>(API.CUSTOMER_CREATE_MANY, body)
    },

    update(id: string, body: iCus.UpdateCustomerPayload) {
        return http.put<BaseResponse<iCus.ICustomer>>(API.CUSTOMER_UPDATE(id), body)
    },

    delete(id: string, soft: boolean = true) {
        return http.delete<BaseResponse<iCus.ICustomer>>(API.CUSTOMER_DELETE(id) + `${soft ? '' : '?soft=false'}`)
    },

    changeStatus(id: string) {
        return http.put<BaseResponse<iCus.ICustomer>>(API.CUSTOMER_CHANGESTATUS(id))
    },
}