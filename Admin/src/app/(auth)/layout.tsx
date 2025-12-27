import { AppBar, Box, Grid, IconButton, List, ListItem, ListItemButton, ListItemText, Paper, Popper, Toolbar, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { SettingMenu } from '../../shared/components/drawer/Drawer';
import ThemeSwitch from '../../shared/components/ThemeSwitch';

interface AuthLayoutProps {
    children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <Box
            sx={{
                width: "100vw",
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'background.default',
            }}
        >
            <Box>
                <ThemeSwitch />
            </Box>
            {children}
        </Box>
    );
}
