"use client"
import { create } from "zustand";
import { IColor } from "../interface/product-interface";

interface IColorStore {
    selectedColor: IColor | null;
    setSelectedColor: (color: IColor | null) => void;
}

export const useColorStore = create<IColorStore>((set) => ({
    selectedColor: null,
    setSelectedColor: (s) => set({ selectedColor: s }),
}));
