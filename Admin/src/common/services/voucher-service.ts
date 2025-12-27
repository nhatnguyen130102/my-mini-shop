import http from "@/shared/api/http"
import API from "@/shared/api/path"
import { BaseResponse } from "../interface/base-interface"
import * as IVou from "../interface/voucher-interface"

export const voucherService = {
    getAll(page?: number, limit?: number, fieldName?: string, value?: string) {
        const params = new URLSearchParams();

        if (page !== undefined) params.append('page', String(page));
        if (limit !== undefined) params.append('limit', String(limit));
        if (fieldName && value) {
            params.append(fieldName, value);
        }

        const queryString = params.toString();

        return http.get<BaseResponse<IVou.IVoucher[]>>(
            `${API.VOUCHER_GETALL}?${queryString}`
        );
    },

    getBy(id: string) {
        return http.get<BaseResponse<IVou.IVoucher>>(API.VOUCHER_GETBY(id))
    },

    create(body: IVou.CreateVoucherPayload) {
        return http.post<BaseResponse<IVou.IVoucher>>(API.VOUCHER_CREATE, body)
    },

    createMany(body: IVou.CreateVoucherPayload[]) {
        return http.post<BaseResponse<IVou.IVoucher[]>>(API.VOUCHER_CREATE_MANY, body)
    },

    update(id: string, body: IVou.UpdateVoucherPayload) {
        return http.put<BaseResponse<IVou.IVoucher>>(API.VOUCHER_UPDATE(id), body)
    },

    delete(id: string, soft: boolean = true) {
        return http.delete<BaseResponse<IVou.IVoucher>>(API.VOUCHER_DELETE(id) + `${soft ? '' : '?soft=false'}`)
    },

    changeStatus(id: string) {
        return http.put<BaseResponse<IVou.IVoucher>>(API.VOUCHER_CHANGESTATUS(id))
    },
}