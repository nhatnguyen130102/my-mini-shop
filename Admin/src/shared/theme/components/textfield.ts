"use client"
import { Components, Theme } from '@mui/material/styles';

export const MuiTextField: Components<Theme>['MuiTextField'] = {
    defaultProps: {
        variant: 'outlined',
        size: 'medium',
    },
};

export const MuiOutlinedInput: Components<Theme>['MuiOutlinedInput'] = {
    styleOverrides: {
        root: ({ theme }) => ({
            borderRadius: 10,
            backgroundColor: theme.palette.background.paper,

            '& fieldset': {
                borderColor: theme.palette.divider,
            },

            '&:hover fieldset': {
                borderColor: theme.palette.text.primary,
            },

            '&.Mui-focused fieldset': {
                borderColor: theme.palette.secondary.main,
                borderWidth: 2,
            },

            '&.Mui-error fieldset': {
                borderColor: theme.palette.error.main,
            },
        }),

        input: ({ theme }) => ({
            color: theme.palette.text.primary,

            '&::placeholder': {
                color: theme.palette.text.disabled,
                opacity: 1,
            },
        }),
    },
};
