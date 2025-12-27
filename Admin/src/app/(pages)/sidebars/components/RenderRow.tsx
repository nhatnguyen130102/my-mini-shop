'use client'
import { ISidebar } from "@/common/interface/sidebar-interface";
import { StyledTableRow, StyledTableCell } from "@/shared/components/table/styled";
import { Typography, Switch, IconButton, Button } from "@mui/material";
import React from "react";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DoDisturbAltOutlinedIcon from '@mui/icons-material/DoDisturbAltOutlined';
import SubdirectoryArrowLeftOutlinedIcon from '@mui/icons-material/SubdirectoryArrowLeftOutlined';
import SubdirectoryArrowRightOutlinedIcon from '@mui/icons-material/SubdirectoryArrowRightOutlined';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';


export const renderRows = (
    items: (ISidebar & { children?: ISidebar[] })[],
    level: number,
    onAdd: (parent: ISidebar | null) => void,
    onEdit: (data: ISidebar) => void,
    onView: (data: ISidebar) => void,
    onDelete: (data: ISidebar) => void,
    onDeleteHard: (data: ISidebar) => void,
    onToggleStatus: (data: ISidebar) => void,
    parentData: ISidebar | null,
    expandedRows: string[],
    setExpandedRows: React.Dispatch<React.SetStateAction<string[]>>
) => {

    return (
        <>
            {
                items.map((item, idx) => {
                    const hasChildren = item.children && item.children.length > 0;
                    const isExpanded = expandedRows.includes(item.id);
                    const toggleExpand = () => {
                        if (!hasChildren) return;

                        setExpandedRows(prev => {

                            if (prev.includes(item.id)) {
                                return prev.filter(id => id !== item.id);
                            }

                            return [...prev, item.id];
                        });
                    };

                    return (
                        <React.Fragment key={item.id}>
                            <StyledTableRow onClick={toggleExpand}
                                hover
                                sx={{ cursor: hasChildren ? 'pointer' : 'default' }}
                            >
                                <StyledTableCell align='left' >
                                    <Typography >
                                        {hasChildren && (
                                            <ExpandCircleDownOutlinedIcon
                                                sx={{
                                                    transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                                                    transition: "transform 0.3s ease",
                                                }}
                                            />
                                        )}
                                    </Typography>
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    <Typography
                                        sx={{
                                            paddingLeft: level * 4,
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1,
                                        }}
                                    >
                                        {level > 0 && (
                                            <SubdirectoryArrowRightOutlinedIcon
                                                fontSize="small"
                                                sx={{ opacity: 0.7 }}
                                            />
                                        )}
                                        {item.name}
                                    </Typography>
                                </StyledTableCell>

                                <StyledTableCell align='left'>
                                    <Typography >
                                        {item.code}
                                    </Typography>
                                </StyledTableCell>
                                <StyledTableCell align='left'>
                                    <Typography >
                                        {item.path}
                                    </Typography>
                                </StyledTableCell>
                                <StyledTableCell align="center" onClick={(e) => e.stopPropagation()} >
                                    <Switch
                                        checked={Boolean(item.isActive)}
                                        onChange={(e) => {
                                            e.stopPropagation();
                                            onToggleStatus?.(item);
                                        }}
                                    />
                                </StyledTableCell>
                                <StyledTableCell align="center" >
                                    <IconButton
                                        color="primary"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onEdit?.(item);
                                        }}
                                    >
                                        <EditOutlinedIcon />
                                    </IconButton>
                                    <IconButton
                                        color="error"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onDelete?.(item);
                                        }}
                                    >
                                        <DoDisturbAltOutlinedIcon />
                                    </IconButton>
                                    <IconButton
                                        color="error"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onDeleteHard?.(item);
                                        }}
                                    >
                                        <DeleteOutlineOutlinedIcon />
                                    </IconButton>
                                </StyledTableCell>
                                <StyledTableCell align='center' >
                                    <Button
                                        variant='outlined'
                                        color='primary'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onAdd(item)
                                        }}
                                        startIcon={<SubdirectoryArrowLeftOutlinedIcon />}
                                    >
                                        Add new child
                                    </Button>
                                </StyledTableCell>
                            </StyledTableRow>
                            {item.children &&
                                isExpanded &&
                                renderRows(
                                    item.children,
                                    level + 1,
                                    onAdd,
                                    onEdit,
                                    onView,
                                    onDelete,
                                    onDeleteHard,
                                    onToggleStatus,
                                    item,
                                    expandedRows,
                                    setExpandedRows
                                )
                            }
                        </React.Fragment >
                    )
                })
            }
            {
                !parentData && (
                    <StyledTableRow>
                        <StyledTableCell colSpan={7} align="center">
                            <Button variant="contained" onClick={() => onAdd(null)}>
                                Add new root item
                            </Button>
                        </StyledTableCell>
                    </StyledTableRow>
                )
            }

        </>
    )
}
