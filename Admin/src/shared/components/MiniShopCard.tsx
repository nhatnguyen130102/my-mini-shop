'use client'

import { Card, CardContent, Typography, CardHeader } from '@mui/material'
import { styled } from '@mui/material/styles'
import React from 'react'

export interface MiniShopCardProps {
    title: string;
    children: React.ReactNode;
    className?: string;
    sx?: React.CSSProperties;
}

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
    borderRadius: 8,
    boxShadow: 'none',
    border: `1px solid ${theme.palette.divider}`,
    transition: 'all 0.25s ease',
}));

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
    padding: "16px 16px 0px 16px",
    '& .MuiTypography-root': {
        fontWeight: 'bold',
        fontSize: '24px',
        color: theme.palette.text.primary,
    },
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
    padding: "8px 16px 16px 16px",
    display: "flex",
    flexDirection: "column",
    gap: 2,
}));

const MiniShopCard = ({ title = "", children, className = "", sx }: MiniShopCardProps) => {
    return (
        <StyledCard className={`${className} wraper-mini-shop-card`} sx={sx}>
            <StyledCardHeader
                className={`${className} wraper-mini-shop-card header`}
                title={<Typography variant="body1" gutterBottom>{title}</Typography>}
            />
            <StyledCardContent
                className={`${className} wraper-mini-shop-card content`}
            >
                {children}
            </StyledCardContent>
        </StyledCard>
    )
}

export default MiniShopCard
