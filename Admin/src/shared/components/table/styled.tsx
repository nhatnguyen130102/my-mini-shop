
'use client'
import { styled } from '@mui/material/styles';
import {
    TableCell, TableRow,
    tableCellClasses
} from '@mui/material';
export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export const StyledTableRowHead = styled(TableRow)(({ theme }) => ({
    [`& th:first-of-type`]: {
        borderTopLeftRadius: 8,   // bo góc trái trên
        borderBottomLeftRadius: 8,
    },
    [`& th:last-of-type`]: {
        borderTopRightRadius: 8,  // bo góc phải trên
        borderBottomRightRadius: 8,
    },
}));

