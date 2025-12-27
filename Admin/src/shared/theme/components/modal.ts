"use client"
import { Components, Theme } from '@mui/material/styles';

export const MuiModal: Components<Theme>['MuiModal'] = {
    styleOverrides: {
        backdrop: {
            backgroundColor: 'rgba(0,0,0,0.5)',
        },
    },
};
