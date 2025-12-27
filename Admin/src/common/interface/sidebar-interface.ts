import { BaseEntity } from "./base-interface";


export interface ISidebarTree extends ISidebar {
    children: ISidebarTree[];
}


export interface ISidebar extends BaseEntity, UpdateSidebarPayload {
    icon: IIcon;
    isDeleted: boolean,
    path: string,
    sort: number,
    level: number,
}

export interface UpdateSidebarPayload extends CreateSidebarPayload {
    id: string,
}

export interface CreateSidebarPayload {
    iconId: string;
    parentId: string;
    name: string,
    isActive: boolean,
    description: string,
}

export interface IIcon extends BaseEntity, UpdateIconPayload {
    isDeleted: boolean,
}

export interface UpdateIconPayload extends CreateIconPayload {
    id: string,
}

export interface CreateIconPayload {
    iconName: string,
    name: string,
    isActive: boolean,
    description: string,
}
