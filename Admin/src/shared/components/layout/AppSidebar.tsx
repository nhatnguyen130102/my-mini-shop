// shared/components/layout/AppSidebar.tsx
import { Box, Drawer, List, Typography, Divider, IconButton, useTheme } from '@mui/material';
import { PushPin as PushPinIcon, PushPinOutlined as PushPinOutlinedIcon } from '@mui/icons-material';
import { useSidebar } from '@/shared/context/SidebarContext';
import { SidebarMenuItem } from './SidebarMenuItem';
import { ISidebarTree } from '@/common/interface/sidebar-interface';

const DRAWER_WIDTH = 320;
const COLLAPSED_WIDTH = 70;

export const AppSidebar = ({ data }: { data: ISidebarTree[] }) => {
    const theme = useTheme();
    const { isPinned, togglePin, setIsHovered, isHovered, isOpenFull } = useSidebar();

    // Tính width theo trạng thái
    let finalWidth = 0;
    if (isPinned) {
        finalWidth = isHovered ? DRAWER_WIDTH : COLLAPSED_WIDTH;
    } else {
        finalWidth = isOpenFull ? DRAWER_WIDTH : 0;
    }

    return (
        <Box
            component="nav"
            onMouseEnter={() => isPinned && setIsHovered(true)}
            onMouseLeave={() => isPinned && setIsHovered(false)}
            sx={{
                width: finalWidth,
                transition: theme.transitions.create('width', { duration: 300 }),
                flexShrink: 0,
                position: 'relative',
                zIndex: theme.zIndex.drawer,
            }}
        >
            <Drawer
                variant="permanent"
                sx={{
                    '& .MuiDrawer-paper': {
                        width: finalWidth,
                        transition: theme.transitions.create('width', {
                            easing: theme.transitions.easing.sharp,
                            duration: 300,
                        }),
                        overflowX: 'hidden',
                        mt: '64px',
                        height: 'calc(100% - 64px)',
                        borderRight: `1px solid ${theme.palette.divider}`,
                        boxShadow: isPinned && isHovered ? theme.shadows[8] : 'none',
                    },
                }}
            >
                <Box
                    sx={{
                        p: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: finalWidth === DRAWER_WIDTH ? 'flex-start' : 'center',
                        minHeight: 48,
                    }}
                >
                    {finalWidth === DRAWER_WIDTH && (
                        <Typography variant="caption" sx={{ fontWeight: 700, ml: 2 }}>
                            MENU
                        </Typography>
                    )}
                    <IconButton onClick={togglePin} size="small">
                        {isPinned ? (
                            <PushPinIcon fontSize="small" color="primary" />
                        ) : (
                            <PushPinOutlinedIcon fontSize="small" />
                        )}
                    </IconButton>
                </Box>
                <Divider />
                <List>
                    {data.map(item => (
                        <SidebarMenuItem key={item.id} item={item} />
                    ))}
                </List>
            </Drawer>
        </Box>
    );
};
