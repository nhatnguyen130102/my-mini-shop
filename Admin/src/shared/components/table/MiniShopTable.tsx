'use client';

import {
    Table, TableBody, TableContainer, TableHead,
    Paper, IconButton, Typography, Switch, TablePagination
} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import React, { useState, useEffect } from 'react';
import { getNestedValue } from '@/common/utils/getNestedValue';
import DoDisturbAltOutlinedIcon from '@mui/icons-material/DoDisturbAltOutlined';
import { StyledTableRowHead, StyledTableCell, StyledTableRow } from './styled';

export interface Column<T = any> {
    id: keyof T | string;
    label: string;
    minWidth?: number;
    align?: 'left' | 'right' | 'center';
    format?: (value: T[keyof T], row?: T) => React.ReactNode;
    icon?: (value: string) => React.ElementType;
}

export interface MiniShopTableProps<T> {
    columns: Column<T>[];
    rows: T[];
    totalCount?: number;
    pageSize?: number;
    serverSide?: boolean;
    onEdit?: (row: T) => void;
    onDelete?: (row: T) => void;
    onDeleteHard?: (row: T) => void;
    onToggleStatus?: (row: T) => void;
    onRowClick?: (row: T) => void;
    onPageChange?: (page: number, pageSize: number) => void;
}

export default function MiniShopTable<
    T extends { id: string | number }
>({
    columns,
    rows,
    totalCount,
    pageSize = 10,
    serverSide = false,
    onEdit,
    onDelete,
    onDeleteHard,
    onToggleStatus,
    onRowClick,
    onPageChange,
}: MiniShopTableProps<T>) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(pageSize);
    const hasActions = !!(onEdit || onDelete || onDeleteHard);

    // Nếu là server-side thì gọi callback khi page/rowsPerPage thay đổi
    useEffect(() => {
        if (serverSide && onPageChange) {
            onPageChange(page, rowsPerPage);
        }
    }, [page, rowsPerPage, serverSide, onPageChange]);

    // Nếu là local thì slice dữ liệu
    const displayRows = serverSide
        ? rows
        : rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 600 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead >
                        <StyledTableRowHead>
                            <StyledTableCell align='center'>
                                <Typography variant="subtitle2" fontWeight="bold">
                                    #
                                </Typography>
                            </StyledTableCell>
                            {columns.map((col, idx) => (
                                <StyledTableCell key={String(col.id) + "-" + idx} style={{ minWidth: col.minWidth }} align={col.align ?? "left"}>
                                    <Typography variant="subtitle2" fontWeight="bold">
                                        {col.label}
                                    </Typography>
                                </StyledTableCell>
                            ))}
                            {hasActions && (
                                <StyledTableCell align="center" style={{ minWidth: 200 }}>
                                    <Typography variant="subtitle2" fontWeight="bold">
                                        Actions
                                    </Typography>
                                </StyledTableCell>
                            )}

                        </StyledTableRowHead>
                    </TableHead>
                    <TableBody>
                        {displayRows.map((row, idx) => (
                            <StyledTableRow
                                hover
                                key={row.id + "-" + idx}
                                onClick={() => onRowClick?.(row)}
                                sx={{ cursor: onRowClick ? 'pointer' : 'default' }}
                            >
                                <StyledTableCell align="center">
                                    {idx + 1}
                                </StyledTableCell>
                                {columns.map((col) => {
                                    const value =
                                        typeof col.id === 'string' && col.id.includes('.')
                                            ? getNestedValue(row, col.id)
                                            : (row as any)[col.id];
                                    if (col.id === "isActive") {
                                        return (
                                            <StyledTableCell key={String(col.id) + "-" + idx} align="center" onClick={(e) => e.stopPropagation()}>
                                                <Switch
                                                    checked={Boolean(value)}
                                                    onChange={(e) => {
                                                        e.stopPropagation();
                                                        onToggleStatus?.(row);
                                                    }}
                                                />
                                            </StyledTableCell>
                                        )
                                    } else {
                                        return (
                                            <StyledTableCell key={String(col.id) + "-" + idx} align={col.align}>
                                                {col.format
                                                    ? col.format(value, row)
                                                    : col.icon
                                                        ? (() => {
                                                            const IconComp = col.icon(value);
                                                            return <IconComp />;
                                                        })()
                                                        : value !== undefined && value !== null
                                                            ? String(value)
                                                            : "-"}
                                            </StyledTableCell>

                                        );
                                    }
                                })}

                                {/* Actions column */}
                                {hasActions && (
                                    <StyledTableCell align="center">
                                        {onEdit && (
                                            <IconButton
                                                color="primary"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onEdit(row);
                                                }}
                                            >
                                                <EditOutlinedIcon />
                                            </IconButton>
                                        )}

                                        {onDelete && (
                                            <IconButton
                                                color="warning"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onDelete(row);
                                                }}
                                            >
                                                <DoDisturbAltOutlinedIcon />
                                            </IconButton>
                                        )}

                                        {onDeleteHard && (
                                            <IconButton
                                                color="error"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onDeleteHard(row);
                                                }}
                                            >
                                                <DeleteOutlineOutlinedIcon />
                                            </IconButton>
                                        )}
                                    </StyledTableCell>
                                )}

                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination */}
            <TablePagination
                component="div"
                count={serverSide ? totalCount ?? 0 : rows.length}
                page={page}
                onPageChange={(_, newPage) => setPage(newPage)}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={(e) => {
                    setRowsPerPage(parseInt(e.target.value, 10));
                    setPage(0);
                }}
            />
        </Paper>
    );
}
