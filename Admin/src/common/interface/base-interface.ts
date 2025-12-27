export interface BaseResponse<T> {
    isSuccess: boolean,
    message: string,
    total: number,
    data: T
}

export interface BaseEntity {
    code?: string,
    createdAt?: string,
    updatedAt?: string,
    createdBy?: string,
    updatedBy?: string,
}

export interface IIdName {
    id: string,
    name: string
}