"use client";
import React from "react";
import { Grid, TextField, MenuItem, SxProps, TextFieldProps } from "@mui/material";
import { FormikProps } from "formik";

interface Option {
    id: string | number;
    name: string;
    icon?: React.ElementType;
}

type MiniShopSelectFieldProps = TextFieldProps & {
    formik: FormikProps<any>;
    name: string;
    options: Option[];
    gridSize?: { xl?: number; lg?: number; md?: number; sm?: number; xs?: number } | number;
    className?: string;
    sx?: SxProps;
};

const MiniShopSelectField: React.FC<MiniShopSelectFieldProps> = ({
    formik,
    name,
    options,
    gridSize = { xl: 6, lg: 6, md: 6, sm: 12, xs: 12 },
    className,
    sx,
    ...textFieldProps
}) => {
    return (
        <Grid size={gridSize} className={`mini-shop-select-field ${className}`}>
            <TextField
                {...textFieldProps}
                {...formik.getFieldProps(name)}
                select
                fullWidth
                name={name}
                value={formik.values[name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched[name] && Boolean(formik.errors[name])}
                helperText={formik.touched[name] && typeof formik.errors[name] === "string" ? (formik.errors[name] as string) : undefined}
                className={className}
            >
                {options.map((item) => (
                    <MenuItem key={item.id} value={item.id} >
                        {item.icon && <item.icon />}
                        {item.icon && " - "}
                        {item.name}

                    </MenuItem>
                ))}
            </TextField>
        </Grid>
    );
};

export default MiniShopSelectField;
