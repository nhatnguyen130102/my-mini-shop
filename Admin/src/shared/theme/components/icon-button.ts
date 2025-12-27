"use client"
import { Components, Theme, alpha } from '@mui/material/styles';

export const MuiIconButton: Components<Theme>['MuiIconButton'] = {
    defaultProps: {
        disableRipple: true,
    },

    styleOverrides: {
        root: ({ theme }) => ({
            borderRadius: 8,
            padding: 8,
            transition: 'all 0.2s ease',

            '&:hover': {
                backgroundColor: theme.palette.action.hover,
                color: theme.palette.action.active,
            },

            '&.Mui-disabled': {
                color: theme.palette.action.disabled,
            },
        }),
    },

    variants: [
        // PRIMARY ICON BUTTON
        {
            props: { color: 'primary' },
            style: ({ theme }) => ({
                color: theme.palette.primary.main,
                '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.light, 0.12),
                },
            }),
        },

        // SECONDARY ICON BUTTON
        {
            props: { color: 'secondary' },
            style: ({ theme }) => ({
                color: theme.palette.secondary.main,
                '&:hover': {
                    backgroundColor: alpha(theme.palette.secondary.light, 0.12),
                },
            }),
        },

        // ERROR ICON BUTTON
        {
            props: { color: 'error' },
            style: ({ theme }) => ({
                color: theme.palette.error.main,
                '&:hover': {
                    backgroundColor: alpha(theme.palette.error.main, 0.12),
                    color: theme.palette.error.dark,
                },
            }),
        },

        // WARNING ICON BUTTON
        {
            props: { color: 'warning' },
            style: ({ theme }) => ({
                color: theme.palette.warning.main,
                '&:hover': {
                    backgroundColor: alpha(theme.palette.warning.light, 0.12),
                    color: theme.palette.warning.dark,
                },
            }),
        },

        // INFO ICON BUTTON
        {
            props: { color: 'info' },
            style: ({ theme }) => ({
                color: theme.palette.info.main,
                '&:hover': {
                    backgroundColor: alpha(theme.palette.info.light, 0.12),
                    color: theme.palette.info.dark,
                },
            }),
        },

        // SUCCESS ICON BUTTON
        {
            props: { color: 'success' },
            style: ({ theme }) => ({
                color: theme.palette.success.main,
                '&:hover': {
                    backgroundColor: alpha(theme.palette.success.light, 0.12),
                    color: theme.palette.success.dark,
                },
            }),
        },
    ],
};
