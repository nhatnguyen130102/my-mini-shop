import { BaseEntity } from "./base-interface";
import { IUser } from "./user-interface";

export interface IEmployee extends BaseEntity, UpdateEmployeePayload {
    isDeleted: boolean,
    user: IUser,

}

export interface UpdateEmployeePayload extends CreateEmployeePayload {
    id: string,
}

export interface CreateEmployeePayload {
    isActive: boolean,
    description: string,
    name: string,
    userId: string,
    isManager: boolean,
}
