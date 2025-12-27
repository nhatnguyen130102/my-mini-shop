import { BaseEntity } from "./base-interface";

export interface IPaymentMethod extends BaseEntity, UpdatePaymentMethodPayload {
    isDeleted: boolean,
}

export interface UpdatePaymentMethodPayload extends CreatePaymentMethodPayload {
    id: string,
}

export interface CreatePaymentMethodPayload {
    isActive: boolean,
    description: string,
    name: string,
}
