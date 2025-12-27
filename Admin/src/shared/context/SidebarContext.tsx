// shared/context/SidebarContext.tsx
'use client'
import React, { createContext, useContext, useState, useCallback } from 'react';

interface SidebarContextType {
    isPinned: boolean;
    isHovered: boolean;
    expandedItems: Set<string>;
    togglePin: () => void;
    setIsHovered: (hover: boolean) => void;
    setExpanded: (id: string, expanded: boolean) => void;
    isOpen: boolean;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
    const [isPinned, setIsPinned] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

    const togglePin = useCallback(() => setIsPinned(prev => !prev), []);

    const setExpanded = useCallback((id: string, expanded: boolean) => {
        setExpandedItems(prev => {
            const next = new Set(prev);
            expanded ? next.add(id) : next.delete(id);
            return next;
        });
    }, []);

    const isOpen = isPinned || isHovered;

    return (
        <SidebarContext.Provider value={{
            isPinned, isHovered, expandedItems, isOpen,
            togglePin, setIsHovered, setExpanded
        }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) throw new Error('useSidebar must be used within SidebarProvider');
    return context;
};