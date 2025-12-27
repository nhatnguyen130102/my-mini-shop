import { BaseEntity, IItemDetail } from "./base-interface";
import { ICustomer } from "./customer-interface";

export interface ICart extends BaseEntity, UpdateCartPayload {
    isDeleted: boolean,
    customer: ICustomer,
}

export interface UpdateCartPayload extends CreateCartPayload {
    id: string,
}

export interface CreateCartPayload {
    isActive: boolean,
    description: string,
    name: string,
    customerId: string,
    cartItem: IItemDetail[],
}
