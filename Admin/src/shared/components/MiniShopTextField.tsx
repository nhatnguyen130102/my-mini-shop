"use client";
import React from "react";
import { Grid, TextField, TextFieldProps, SxProps } from "@mui/material";
import { FormikProps } from "formik";

type MiniShopTextFieldProps = TextFieldProps & {
    formik: FormikProps<any>;
    name: string;
    gridSize?: { xl?: number; lg?: number; md?: number; sm?: number; xs?: number } | number;
    className?: string;
    sx?: SxProps;
    rows?: number;
    multiline?: boolean;
};

const MiniShopTextField: React.FC<MiniShopTextFieldProps> = ({
    formik,
    name,
    gridSize = { xl: 6, lg: 6, md: 6, sm: 12, xs: 12 },
    sx,
    className,
    rows = 4,
    multiline = false,
    ...textFieldProps
}) => {
    return (
        <Grid size={gridSize} className={`mini-shop-text-field ${className}`}>
            <TextField
                {...textFieldProps}
                {...formik.getFieldProps(name)}
                fullWidth
                multiline={multiline}
                rows={rows}
                name={name}
                value={formik.values[name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched[name] && Boolean(formik.errors[name])}
                helperText={formik.touched[name] && typeof formik.errors[name] === "string" ? (formik.errors[name] as string) : undefined}
            />
        </Grid >
    );
};

export default MiniShopTextField;
