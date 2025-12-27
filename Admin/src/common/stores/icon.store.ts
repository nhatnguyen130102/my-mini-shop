"use client"
import { create } from "zustand";
import { IIcon } from "../interface/sidebar-interface";

interface IIconStore {
    selectedIcon: IIcon | null;
    setSelectedIcon: (icon: IIcon | null) => void;
}

export const useIconStore = create<IIconStore>((set) => ({
    selectedIcon: null,
    setSelectedIcon: (s) => set({ selectedIcon: s }),
}));
