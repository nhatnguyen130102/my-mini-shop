// shared/components/sidebar/SidebarMenuItem.tsx
import { ListItemButton, ListItemIcon, ListItemText, Collapse, List } from '@mui/material';
import { ExpandLess, ExpandMore, FiberManualRecord } from '@mui/icons-material';
import { iconMap } from '@/shared/constants/iconMap';
import { ISidebarTree } from '@/common/interface/sidebar-interface';
import { useRouter } from 'next/navigation';
import { useSidebar } from '@/shared/context/SidebarContext';
import { useEffect } from 'react';

export interface SidebarMenuItemProps {
    item: ISidebarTree;
    level?: number;
}

export const SidebarMenuItem = ({ item, level = 0 }: SidebarMenuItemProps) => {
    const { expandedItems, setExpanded, isOpenFull, isHovered, isPinned } = useSidebar();
    const router = useRouter();

    const hasChildren = item.children?.length > 0;
    const isExpanded = expandedItems.has(item.id);
    const IconComponent = iconMap[item.icon.iconName] ?? FiberManualRecord;

    const handleClick = () => {
        if (hasChildren) {
            setExpanded(item.id, !isExpanded);
        } else {
            router.push(item.path);
        }
    };

    return (
        <>
            <ListItemButton
                onClick={handleClick}
                sx={{
                    minHeight: 48,
                    mb: 0.5,
                    px: 2,
                    justifyContent: (isOpenFull || (isPinned && isHovered)) ? 'flex-start' : 'center',
                }}
                className='list-item-button'
            >
                <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: (isOpenFull || (isPinned && isHovered)) ? 2 : 0,
                        justifyContent: 'center',
                        color: 'inherit',
                    }}
                    className='list-item-button icon'

                >
                    <IconComponent />
                </ListItemIcon>

                <ListItemText
                    primary={item.name}
                    sx={{
                        transition: 'opacity 0.2s',
                        whiteSpace: 'nowrap',
                        // overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: (isOpenFull || (isPinned && isHovered)) ? 'block' : 'none',
                        opacity: (isOpenFull || (isPinned && isHovered)) ? 1 : 0,
                    }}
                    className='list-item-button text'
                />

                {hasChildren && isHovered && (
                    isExpanded ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />
                )}
            </ListItemButton>

            {hasChildren && (
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding sx={{ pl: 2 }}>
                        {item.children.map(child => (
                            <SidebarMenuItem
                                key={child.id}
                                item={child}
                                level={level + 1}
                            />
                        ))}
                    </List>
                </Collapse>
            )}
        </>
    );
};
