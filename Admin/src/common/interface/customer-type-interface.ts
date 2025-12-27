import { BaseEntity } from "./base-interface";
import { IUser } from "./user-interface";

export interface ICustomerType extends BaseEntity, UpdateCustomerTypePayload {
    isDeleted: boolean,

}

export interface UpdateCustomerTypePayload extends CreateCustomerTypePayload {
    id: string,
}

export interface CreateCustomerTypePayload {
    isActive: boolean,
    description: string,
    name: string,
}
