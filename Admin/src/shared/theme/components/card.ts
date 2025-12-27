"use client"
import { Components, Theme } from '@mui/material/styles';

export const MuiCard: Components<Theme>['MuiCard'] = {
    styleOverrides: {
        root: ({ theme }) => ({
            borderRadius: 16,
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: 'none',
            transition: 'all 0.25s ease',

            // '&:hover': {
            //     boxShadow: theme.shadows[4],
            //     transform: 'translateY(-2px)',
            // },
        }),
    },
};

export const MuiCardContent: Components<Theme>['MuiCardContent'] = {
    styleOverrides: {
        root: {
            padding: 16,
        },
    },
};
