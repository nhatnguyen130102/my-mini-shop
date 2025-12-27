"use client";
import React from "react";
import { Grid, TextField, InputAdornment, MenuItem, SxProps, TextFieldProps } from "@mui/material";
import { FormikProps } from "formik";

type MiniShopCurrencyFieldProps = TextFieldProps & {
  formik: FormikProps<any>;
  name: string;
  gridSize?: { xl?: number; lg?: number; md?: number; sm?: number; xs?: number } | number;
  className?: string;
  sx?: SxProps;
  currencySymbol?: string;
}

const formatter = new Intl.NumberFormat("vi-VN");

const MiniShopCurrencyField: React.FC<MiniShopCurrencyFieldProps> = ({
  formik,
  name,
  gridSize = { xl: 6, lg: 6, md: 6, sm: 12, xs: 12 },
  className,
  sx,
  currencySymbol = "₫",
  ...textFieldProps
}) => {
  return (
    <Grid size={gridSize} className={`mini-shop-currency-field ${className}`}>
      <TextField
        {...textFieldProps}
        fullWidth
        name={name}
        placeholder="0.00"
        value={formik.values[name] ? formatter.format(formik.values[name]) : ""}
        onChange={(e) => {
          const rawValue = e.target.value.replace(/\./g, "").replace(/,/g, "");
          const num = Number(rawValue);
          formik.setFieldValue(name, isNaN(num) ? "" : num);
        }}
        onBlur={formik.handleBlur}
        error={formik.touched[name] && Boolean(formik.errors[name])}
        helperText={formik.touched[name] && typeof formik.errors[name] === "string" ? (formik.errors[name] as string) : undefined}
        inputProps={{ min: 0, style: { textAlign: "right" } }}
        className={className}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">{currencySymbol}</InputAdornment>
            ),
          },
        }}
      />
    </Grid>
  );
};

export default MiniShopCurrencyField;
