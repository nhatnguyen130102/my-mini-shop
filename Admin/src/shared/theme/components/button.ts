"use client"
import { Components, Theme } from '@mui/material/styles';

export const MuiButton: Components<Theme>['MuiButton'] = {
    defaultProps: {
        disableElevation: true,
        disableRipple: true,
    },

    styleOverrides: {
        root: ({ theme }) => ({
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: "16px",
            padding: '16px 32px',
            transition: 'all 0.2s ease',
            minWidth: "140px",

            '&.Mui-disabled': {
                backgroundColor: theme.palette.action.disabledBackground,
                color: theme.palette.text.disabled,
            },
        }),
    },

    variants: [
        // PRIMARY BUTTON
        {
            props: { variant: 'contained', color: 'primary' },
            style: ({ theme }) => ({
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,

                '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                },

                '&:active': {
                    backgroundColor: theme.palette.primary.dark,
                    transform: 'scale(0.98)',
                },
            }),
        },

        // SECONDARY BUTTON
        {
            props: { variant: 'contained', color: 'secondary' },
            style: ({ theme }) => ({
                backgroundColor: theme.palette.secondary.main,
                color: '#111827',

                '&:hover': {
                    backgroundColor: theme.palette.secondary.dark,
                },
            }),
        },

        // OUTLINED
        {
            props: { variant: 'outlined' },
            style: ({ theme }) => ({
                borderColor: theme.palette.primary.light,
                color: theme.palette.text.primary,

                '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                    borderColor: theme.palette.text.primary,
                },
            }),
        },

        // TEXT BUTTON
        {
            props: { variant: 'text' },
            style: ({ theme }) => ({
                color: theme.palette.text.primary,

                '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                },
            }),
        },
    ],
};
