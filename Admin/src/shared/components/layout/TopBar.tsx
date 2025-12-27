// shared/components/layout/TopBar.tsx
import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useSidebar } from '@/shared/context/SidebarContext';
import ThemeSwitch from '../ThemeSwitch';

export const TopBar = () => {
    const { togglePin } = useSidebar();

    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 2 }}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    edge="start"
                    onClick={togglePin}
                    sx={{ mr: 2, display: { md: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
                    Admin Dashboard
                </Typography>
                <ThemeSwitch />
            </Toolbar>
        </AppBar>
    );
};