// src/app/(pages)/layout.tsx
'use client'
import { useState, useEffect } from 'react';
import { Box, CssBaseline } from '@mui/material';
import { sidebarService } from '@/common/services/sidebar-service';
import { buildTree } from '@/common/utils/buildTree';
import { SidebarProvider } from '@/shared/context/SidebarContext';
import { TopBar } from '@/shared/components/layout/TopBar';
import { AppSidebar } from '@/shared/components/layout/AppSidebar';
import { ISidebarTree } from '@/common/interface/sidebar-interface';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);
    const [sidebarData, setSidebarData] = useState<ISidebarTree[]>([]);
    useEffect(() => {
        const fetchSidebar = async () => {
            try {
                const res = await sidebarService.getAll(1, 1000);
                if (res?.payload?.isSuccess) {
                    const tree = buildTree(res.payload.data);
                    setSidebarData(tree as ISidebarTree[]);
                }
            } finally { setLoading(false); }
        };
        fetchSidebar();
    }, []);

    return (
        <SidebarProvider>
            <Box sx={{ display: 'flex' }}>
                <TopBar />
                <AppSidebar data={sidebarData} />
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        mt: '64px',
                        transition: (theme) => theme.transitions.create(['margin', 'width'], {
                            duration: 300
                        }),
                        backgroundColor: 'background.default',
                    }}
                >
                    {children}
                </Box>
            </Box>
        </SidebarProvider>
    );
}