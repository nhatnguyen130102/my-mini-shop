// shared/components/layout/TopBar.tsx
import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useSidebar } from '@/shared/context/SidebarContext';
import ThemeSwitch from '../ThemeSwitch';

export const TopBar = () => {
    const { toggleOpen } = useSidebar();
    return (
        <AppBar position="fixed" sx={{ zIndex: theme => theme.zIndex.drawer + 2 }}>
            <Toolbar>
                <IconButton
                    onClick={() => {
                        toggleOpen()
                    }}
                    sx={{
                        mr: 2, color: 'white',
                        '&:hover': { color: 'black' }
                    }}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6">Admin Dashboard</Typography>
                <Box sx={{ flexGrow: 1 }} />
                <ThemeSwitch />
            </Toolbar>
        </AppBar>
    );
};
