import http from "@/shared/api/http"
import API from "@/shared/api/path"
import { BaseResponse } from "../interface/base-interface"
import * as ICusT from "../interface/customer-type-interface"

export const customerTypeService = {
    getAll(page?: number, limit?: number, fieldName?: string, value?: string) {
        const params = new URLSearchParams();

        if (page !== undefined) params.append('page', String(page));
        if (limit !== undefined) params.append('limit', String(limit));
        if (fieldName && value) {
            params.append(fieldName, value);
        }

        const queryString = params.toString();

        return http.get<BaseResponse<ICusT.ICustomerType[]>>(
            `${API.CUSTOMERTYPE_GETALL}?${queryString}`
        );
    },

    getBy(id: string) {
        return http.get<BaseResponse<ICusT.ICustomerType>>(API.CUSTOMERTYPE_GETBY(id))
    },

    create(body: ICusT.CreateCustomerTypePayload) {
        return http.post<BaseResponse<ICusT.ICustomerType>>(API.CUSTOMERTYPE_CREATE, body)
    },

    createMany(body: ICusT.CreateCustomerTypePayload[]) {
        return http.post<BaseResponse<ICusT.ICustomerType[]>>(API.CUSTOMERTYPE_CREATE_MANY, body)
    },

    update(id: string, body: ICusT.UpdateCustomerTypePayload) {
        return http.put<BaseResponse<ICusT.ICustomerType>>(API.CUSTOMERTYPE_UPDATE(id), body)
    },

    delete(id: string, soft: boolean = true) {
        return http.delete<BaseResponse<ICusT.ICustomerType>>(API.CUSTOMERTYPE_DELETE(id) + `${soft ? '' : '?soft=false'}`)
    },

    changeStatus(id: string) {
        return http.put<BaseResponse<ICusT.ICustomerType>>(API.CUSTOMERTYPE_CHANGESTATUS(id))
    },
}