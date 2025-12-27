"use client"
import { create } from "zustand";
import { IUser } from "../interface/user-interface";

interface IUserStore {
    users: IUser[] | [];
    setUsers: (users: IUser[] | []) => void;

    selectedUser: IUser | null;
    setSelectedUser: (user: IUser | null) => void;
}

export const useUserStore = create<IUserStore>((set) => ({
    selectedUser: null,
    setSelectedUser: (s) => set({ selectedUser: s }),

    users: [],
    setUsers: s => set({ users: s })
}));
