// shared/components/layout/AppSidebar.tsx
import { Box, Drawer, List, Typography, Divider, IconButton, useTheme } from '@mui/material';
import { PushPin as PushPinIcon, PushPinOutlined as PushPinOutlinedIcon } from '@mui/icons-material';
import { useSidebar } from '@/shared/context/SidebarContext';
import { SidebarMenuItem } from './SidebarMenuItem';
import { ISidebarTree } from '@/common/interface/sidebar-interface';


const DRAWER_WIDTH = 280;
const COLLAPSED_WIDTH = 70;

export const AppSidebar = ({ data }: { data: ISidebarTree[] }) => {
    const theme = useTheme();
    const { isPinned, togglePin, setIsHovered, isOpen, expandedItems, setExpanded } = useSidebar();

    return (
        <Box
            component="nav"
            onMouseEnter={() => !isPinned && setIsHovered(true)}
            onMouseLeave={() => !isPinned && setIsHovered(false)}
            sx={{
                width: isPinned ? DRAWER_WIDTH : COLLAPSED_WIDTH,
                transition: theme.transitions.create('width', { duration: 300 }),
                flexShrink: 0,
                position: 'relative',
                zIndex: theme.zIndex.drawer
            }}
        >
            <Drawer
                variant="permanent"
                sx={{
                    '& .MuiDrawer-paper': {
                        width: isOpen ? DRAWER_WIDTH : COLLAPSED_WIDTH,
                        transition: theme.transitions.create('width', {
                            easing: theme.transitions.easing.sharp,
                            duration: 300,
                        }),
                        overflowX: 'hidden',
                        mt: '64px',
                        height: 'calc(100% - 64px)',
                        borderRight: `1px solid ${theme.palette.divider}`,
                        boxShadow: !isPinned && isOpen ? theme.shadows[8] : 'none',
                    },
                }}
            >
                <Box sx={{ p: 1, display: 'flex', alignItems: 'center', justifyContent: isOpen ? 'space-between' : 'center', minHeight: 48 }}>
                    {isOpen && <Typography variant="caption" sx={{ fontWeight: 700, ml: 2 }}>MENU</Typography>}
                    <IconButton onClick={togglePin} size="small">
                        {isPinned ? <PushPinIcon fontSize="small" color="primary" /> : <PushPinOutlinedIcon fontSize="small" />}
                    </IconButton>
                </Box>
                <Divider />
                <List>
                    {data.map((item: ISidebarTree) => (
                        <SidebarMenuItem
                            key={item.id}
                            item={item}
                            isOpen={isOpen}
                            isExpanded={expandedItems.has(item.id)}
                            onExpandChange={setExpanded}
                        />
                    ))}
                </List>
            </Drawer>
        </Box>
    );
};