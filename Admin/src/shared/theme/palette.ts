"use client"
import { PaletteOptions } from '@mui/material/styles';

declare module "@mui/material/styles" {
    interface Palette {
        neutral: Palette["primary"];
        tertiary: Palette["primary"];
        accent: Palette["primary"];
    }
    interface PaletteOptions {
        neutral?: PaletteOptions["primary"];
        tertiary?: PaletteOptions["primary"];
        accent?: PaletteOptions["primary"];
    }
}

export const lightPalette: PaletteOptions = {
    mode: 'light',

    primary: {
        main: '#111827',
        dark: '#030712',
        light: '#1F2937',
        contrastText: '#FFFFFF',
    },

    secondary: {
        main: '#C8A165',
        dark: '#9E7C3A',
        light: '#D4B07A',
    },

    background: {
        default: '#FFFFFF',
        paper: '#F9FAFB',
    },

    text: {
        primary: '#111827',
        secondary: '#4B5563',
        disabled: '#9CA3AF',
    },

    divider: '#E5E7EB',

    success: { main: '#16A34A' },
    warning: { main: '#F59E0B' },
    error: { main: '#DC2626' },
    info: { main: '#2563EB' },

    // ➕ Thêm option
    neutral: {
        main: '#64748B',
        dark: '#475569',
        light: '#CBD5E1',
    },
    tertiary: {
        main: '#9333EA',
        dark: '#7E22CE',
        light: '#A855F7',
    },
    accent: {
        main: '#F472B6',
        dark: '#DB2777',
        light: '#F9A8D4',
    },
    grey: {
        100: '#F3F4F6',
        200: '#E5E7EB',
        300: '#D1D5DB',
        400: '#9CA3AF',
        500: '#6B7280',
        600: '#4B5563',
        700: '#374151',
        800: '#1F2937',
        900: '#111827',
    },
    action: {
        hover: '#F3F4F6',
        selected: '#E5E7EB',
        disabled: '#9CA3AF',
        disabledBackground: '#F9FAFB',
    },
};

export const darkPalette: PaletteOptions = {
    mode: 'dark',

    primary: {
        main: '#F9FAFB',
        dark: '#D1D5DB',
        light: '#FFFFFF',
        contrastText: '#000000',
    },

    secondary: {
        main: '#D4B07A',
        dark: '#B89255',
        light: '#F0D6A3',
    },

    background: {
        default: '#0B0F19',
        paper: '#111827',
    },

    text: {
        primary: '#F9FAFB',
        secondary: '#9CA3AF',
        disabled: '#6B7280',
    },

    divider: '#374151',

    // ➕ Thêm option
    neutral: {
        main: '#94A3B8',
        dark: '#64748B',
        light: '#CBD5E1',
    },
    tertiary: {
        main: '#A855F7',
        dark: '#7E22CE',
        light: '#C084FC',
    },
    accent: {
        main: '#F472B6',
        dark: '#BE185D',
        light: '#F9A8D4',
    },
    grey: {
        100: '#1F2937',
        200: '#374151',
        300: '#4B5563',
        400: '#6B7280',
        500: '#9CA3AF',
        600: '#D1D5DB',
        700: '#E5E7EB',
        800: '#F3F4F6',
        900: '#FFFFFF',
    },
    action: {
        hover: '#1F2937 ',
        selected: '#374151',
        disabled: '#6B7280',
        disabledBackground: '#111827',
    },
};
