"use client"
import { create } from "zustand";
import { ICategory } from "../interface/product-interface";

interface ICategoryStore {
    selectedCategory: ICategory | null;
    setSelectedCategory: (category: ICategory | null) => void;
}

export const useCategoryStore = create<ICategoryStore>((set) => ({
    selectedCategory: null,
    setSelectedCategory: (s) => set({ selectedCategory: s }),
}));
