"use client"
import { Components, Theme } from '@mui/material/styles';

export const MuiDialog: Components<Theme>['MuiDialog'] = {
    styleOverrides: {
        paper: ({ theme }) => ({
            borderRadius: 8,
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[8],
        }),
    },
};

export const MuiDialogTitle: Components<Theme>['MuiDialogTitle'] = {
    styleOverrides: {
        root: ({ theme }) => ({
            fontWeight: 600,
            borderBottom: `1px solid ${theme.palette.divider}`,
        }),
    },
};

export const MuiDialogActions: Components<Theme>['MuiDialogActions'] = {
    styleOverrides: {
        root: {
            padding: '16px 24px',
        },
    },
};
