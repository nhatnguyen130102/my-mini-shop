import { BaseEntity } from "./base-interface";
import { IUser } from "./user-interface";

export interface IRole extends BaseEntity, UpdateRolePayload {
    isDeleted: boolean,
}

export interface UpdateRolePayload extends CreateRolePayload {
    id: string,
}

export interface CreateRolePayload {
    isActive: boolean,
    description: string,
    name: string,
    permission: string,
}

export interface IUserRole extends BaseEntity, UpdateUserRolePayload {
    user: IUser,
    role: IRole,
}

export interface CreateUserRolePayload {
    userId: string,
    roleId: string,
    name: string,
}

export interface UpdateUserRolePayload extends CreateUserRolePayload {
    id: string,
}