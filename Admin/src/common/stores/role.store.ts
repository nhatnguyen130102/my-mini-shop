"use client"
import { create } from "zustand";
import { IRole } from "../interface/role-interface";

interface IRoleStore {
    roles: IRole[] | [];
    setRoles: (roles: IRole[] | []) => void;

    selectedRole: IRole | null;
    setSelectedRole: (role: IRole | null) => void;
}

export const useRoleStore = create<IRoleStore>((set) => ({
    roles: [],
    setRoles: (s) => set({ roles: s }),

    selectedRole: null,
    setSelectedRole: (s) => set({ selectedRole: s }),
}));
