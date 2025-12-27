import { BaseEntity } from "./base-interface";

export interface IOrderMethod extends BaseEntity, UpdateOrderMethodPayload {
    isDeleted: boolean,
}

export interface UpdateOrderMethodPayload extends CreateOrderMethodPayload {
    id: string,
}

export interface CreateOrderMethodPayload {
    isActive: boolean,
    description: string,
    name: string,
}
