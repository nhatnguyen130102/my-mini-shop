// shared/components/sidebar/SidebarMenuItem.tsx
import { ListItemButton, ListItemIcon, ListItemText, Collapse, List } from '@mui/material';
import { ExpandLess, ExpandMore, FiberManualRecord } from '@mui/icons-material';
import { iconMap } from '@/shared/constants/iconMap';
import { ISidebarTree } from '@/common/interface/sidebar-interface';
import { useRouter } from 'next/navigation';

export interface SidebarMenuItemProps {
    item: ISidebarTree;
    level?: number;
    isOpen: boolean;
    isExpanded: boolean;
    onExpandChange?: (id: string, expanded: boolean) => void;
}

export const SidebarMenuItem = ({ item, level = 0, isOpen, isExpanded, onExpandChange }: SidebarMenuItemProps) => {
    const hasChildren = item.children && item.children.length > 0;
    const IconComponent = iconMap[item.icon.iconName] ?? FiberManualRecord;
    const router = useRouter();
    return (
        <>
            <ListItemButton
                onClick={() => hasChildren ? onExpandChange?.(item.id, !isExpanded) : router.push(item.path)}
                sx={{
                    minHeight: 48,
                    mb: 0.5,
                    px: 2,
                    justifyContent: isOpen ? 'initial' : 'center',
                }}
            >
                <ListItemIcon sx={{
                    minWidth: 0,
                    mr: isOpen ? 2 : 'auto',
                    justifyContent: 'center',
                    color: 'inherit'
                }}>
                    <IconComponent />
                </ListItemIcon>

                <ListItemText
                    primary={item.name}
                    sx={{
                        opacity: isOpen ? 1 : 0,
                        transition: 'opacity 0.2s',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                />

                {hasChildren && isOpen && (
                    isExpanded ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />
                )}
            </ListItemButton>

            {hasChildren && (
                <Collapse in={isExpanded && isOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding sx={{ paddingLeft: "8px" }}>
                        {item.children.map((child: any) => (
                            <SidebarMenuItem
                                key={child.id}
                                item={child}
                                level={level + 1}
                                isOpen={isOpen}
                                isExpanded={false}
                            />
                        ))}
                    </List>
                </Collapse>
            )}
        </>
    );
};