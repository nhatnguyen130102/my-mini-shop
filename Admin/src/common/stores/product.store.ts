import { create } from "zustand";
import { ICategory, IColor, IMaterial, IProduct, ISize } from "../interface/product-interface";

interface IProductStore {
    products: IProduct[] | [];
    setProducts: (products: IProduct[] | []) => void;

    selectedProduct: IProduct | null;
    setSelectedProduct: (product: IProduct | null) => void;

    cateogries: ICategory[] | [];
    setCategories: (cateogries: ICategory[] | []) => void;

    colors: IColor[] | [];
    setColors: (colors: IColor[] | []) => void;

    sizes: ISize[] | [];
    setSizes: (sizes: ISize[] | []) => void;

    materials: IMaterial[] | [];
    setMaterials: (materials: IMaterial[] | []) => void;

}

export const useProductStore = create<IProductStore>((set) => ({
    products: [],
    setProducts: (s) => set({ products: s }),

    cateogries: [],
    setCategories: (s) => set({ cateogries: s }),

    colors: [],
    setColors: (s) => set({ colors: s }),

    sizes: [],
    setSizes: (s) => set({ sizes: s }),

    materials: [],
    setMaterials: (s) => set({ materials: s }),

    selectedProduct: null,
    setSelectedProduct: (s) => set({ selectedProduct: s }),
}));
