"use client"
import { create } from "zustand";
import { ISize } from "../interface/product-interface";

interface ISizeStore {
    selectedSize: ISize | null;
    setSelectedSize: (size: ISize | null) => void;
}

export const useSizeStore = create<ISizeStore>((set) => ({
    selectedSize: null,
    setSelectedSize: (s) => set({ selectedSize: s }),
}));
