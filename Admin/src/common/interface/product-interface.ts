import { BaseEntity, IIdName } from "./base-interface";

export interface IProduct extends BaseEntity, UpdateProductPayload {
    category: IIdName,
    color: IIdName,
    size: IIdName,
    material: IIdName,
    isDeleted: boolean,
}

export interface UpdateProductPayload extends CreateProductPayload {
    id: string,
}

export interface CreateProductPayload {
    price: number,
    categoryId: string,
    colorId: string,
    sizeId: string,
    materialId: string,
    name: string,
    description: string,
    isActive: boolean,
}

export interface ICategory extends BaseEntity, UpdateCategoryPayload {
    isDeleted: boolean,
}

export interface UpdateCategoryPayload extends CreateCategoryPayload {
    id: string,
}

export interface CreateCategoryPayload {
    name: string,
    description: string,
    isActive: boolean,
}

export interface IColor extends BaseEntity, UpdateColorPayload {
    isDeleted: boolean,
}

export interface UpdateColorPayload extends CreateColorPayload {
    id: string,
}

export interface CreateColorPayload {
    name: string,
    colorCode: string,
    description: string,
    isActive: boolean,
}

export interface ISize extends BaseEntity, UpdateSizePayload {
    isDeleted: boolean,
}

export interface UpdateSizePayload extends CreateSizePayload {
    id: string,
}

export interface CreateSizePayload {
    name: string,
    description: string,
    isActive: boolean,
}

export interface ICategory extends BaseEntity, UpdateCategoryPayload {
    isDeleted: boolean,
}

export interface UpdateCategoryPayload extends CreateCategoryPayload {
    id: string,
}

export interface CreateCategoryPayload {
    name: string,
    description: string,
}

export interface IMaterial extends BaseEntity, UpdateMaterialPayload {
    isDeleted: boolean,
}

export interface UpdateMaterialPayload extends CreateMaterialPayload {
    id: string,
}

export interface CreateMaterialPayload {
    name: string,
    description: string,
    isActive: boolean,
}