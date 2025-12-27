import { BaseEntity } from "./base-interface";
import { ICustomerType } from "./customer-type-interface";
import { IUser } from "./user-interface";

export interface ICustomer extends BaseEntity, UpdateCustomerPayload {
    isDeleted: boolean,
    user: IUser,
    customerType: ICustomerType,
}

export interface UpdateCustomerPayload extends CreateCustomerPayload {
    id: string,
}

export interface CreateCustomerPayload {
    isActive: boolean,
    description: string,
    name: string,
    userId: string,
    customerTypeId: string,
}
