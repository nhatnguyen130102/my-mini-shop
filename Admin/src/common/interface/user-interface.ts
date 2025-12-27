import { BaseEntity } from "./base-interface";

export interface IAuth {
    token: string,
    user: IUser
}

export interface IUser extends BaseEntity, UpdateUserPayload {
    isDeleted: boolean,
}

export interface UpdateUserPayload extends CreateUserPayload {
    id: string,
}

export interface CreateUserPayload {
    email: string,
    username: string,
    password: string,
    isActive: boolean,
    description: string,
    fullname: string,
    name: string,
}

export interface LoginPayload {
    email: string,
    password: string,
}

export interface RegisterPayload {
    email: string,
    username: string,
    password: string,
}