"use client"
import { create } from "zustand";
import { ISidebar, IIcon } from "../interface/sidebar-interface";
import { ISidebarTree } from "@/shared/components/drawer/Drawer";

interface ISidebarStore {
    treeData: ISidebarTree[] | [],
    setTreeData: (treeData: ISidebarTree[] | []) => void;

    sidebars: ISidebar[];
    setSidebars: (sidebars: ISidebar[]) => void;

    icons: IIcon[];
    setIcons: (icons: IIcon[]) => void;

    selectedSidebar: ISidebar | null;
    setSelectedSidebar: (sidebar: ISidebar | null) => void;

    selectedParentSidebar: ISidebar | null;
    setSelectedParentSidebar: (sidebar: ISidebar | null) => void;
}

export const useSidebarStore = create<ISidebarStore>((set) => ({
    sidebars: [],
    setSidebars: (sidebars) => set({ sidebars }),

    treeData: [],
    setTreeData: (s) => set({ treeData: s }),

    icons: [],
    setIcons: (icons) => set({ icons }),

    selectedSidebar: null,
    setSelectedSidebar: (sidebar) => set({ selectedSidebar: sidebar }),

    selectedParentSidebar: null,
    setSelectedParentSidebar: (sidebar) => set({ selectedParentSidebar: sidebar }),
}));
