import { BaseEntity } from "./base-interface";

export interface IVoucher extends BaseEntity, UpdateVoucherPayload {
    isDeleted: boolean,
}

export interface UpdateVoucherPayload extends CreateVoucherPayload {
    id: string,
}

export interface CreateVoucherPayload {
    isActive: boolean,
    description: string,
    name: string,
    startDate: string,
    endDate: string,
    type: string,
    value: number,
    status: string,
    minimumOrder: number,
    maximumDiscount: number,
}
