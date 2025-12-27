"use client"
import { Components, Theme } from '@mui/material/styles';

export const MuiPopover: Components<Theme>['MuiPopover'] = {
    styleOverrides: {
        paper: ({ theme }) => ({
            borderRadius: 12,
            marginTop: 8,
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[6],
        }),
    },
};
