import { create } from "zustand";
import { IMaterial } from "../interface/product-interface";

interface IMaterialStore {
    selectedMaterial: IMaterial | null;
    setSelectedMaterial: (material: IMaterial | null) => void;
}

export const useMaterialStore = create<IMaterialStore>((set) => ({
    selectedMaterial: null,
    setSelectedMaterial: (s) => set({ selectedMaterial: s }),
}));
