'use client'
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface SidebarContextType {
    isPinned: boolean;
    isHovered: boolean;
    expandedItems: Set<string>;
    togglePin: () => void;
    setIsHovered: (hover: boolean) => void;
    setExpanded: (id: string, expanded: boolean) => void;
    isOpenFull: boolean;
    toggleOpen: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
    const [isPinned, setIsPinned] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
    const [isOpenFull, setIsOpenFull] = useState(false);

    const togglePin = () => {
        setIsPinned(!isPinned);
        setIsOpenFull(isPinned);
    };

    const setExpanded = useCallback((id: string, expanded: boolean) => {
        setExpandedItems(prev => {
            const next = new Set(prev);
            expanded ? next.add(id) : next.delete(id);
            return next;
        });
    }, []);

    // Toggle từ TopBar: chỉ áp dụng khi không pin
    const toggleOpen = () => {
        setIsPinned(false)
        setIsOpenFull(prev => !prev);
    };

    // SidebarContext.tsx
    useEffect(() => {
        if (!isHovered) {
            setExpandedItems(new Set());
        }
    }, [isHovered]);

    const value: SidebarContextType = {
        isPinned,
        isHovered,
        expandedItems,
        isOpenFull,
        togglePin,
        setIsHovered,
        setExpanded,
        toggleOpen,
    };

    return (
        <SidebarContext.Provider value={value}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) throw new Error('useSidebar must be used within SidebarProvider');
    return context;
};
