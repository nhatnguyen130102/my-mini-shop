'use client';

import { useThemeStore } from '@/common/stores/theme.store';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { ReactNode, useMemo } from 'react';
import { getTheme } from '..';


interface Props {
    children: ReactNode;
}

export default function ThemeRegistry({
    children,
}: Props) {
    const mode = useThemeStore(s => s.mode);
    const theme = useMemo(() => getTheme(mode), [mode]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}
