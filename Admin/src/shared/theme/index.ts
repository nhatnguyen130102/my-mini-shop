"use client"
import { createTheme } from '@mui/material/styles';
import { components } from './components';
import { lightPalette, darkPalette } from './palette';

export const getTheme = (mode: 'light' | 'dark') =>
    createTheme({
        palette: mode === 'light' ? lightPalette : darkPalette,
        components
    });
