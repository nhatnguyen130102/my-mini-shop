'use client';
import * as React from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    Dialog,
    Slide,
    Grid,
    Switch,
    FormControlLabel,
    Divider,
    Box,
    Stack,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps } from '@mui/material/transitions';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useProductStore } from '@/common/stores/product.store';
import { initalProductValue, ProductValueSchema } from '../validate';
import { categoryService } from '@/common/services/category-service';
import { colorService } from '@/common/services/color-service';
import { sizeService } from '@/common/services/size-service';
import { materialService } from '@/common/services/material-service';
import { productService } from '@/common/services/product-service';
import { useNotify } from '@/shared/hooks/useNotify';
import MiniShopSelectField from '@/shared/components/MiniShopSelectField';
import MiniShopCurrencyField from '@/shared/components/MiniShopCurrencyField';
import MiniShopTextField from '@/shared/components/MiniShopTextField';
import MiniShopDialog from '@/shared/components/MiniShopDialog';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<unknown>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});
/* ===================== PROPS ===================== */
interface EditCreateDialogProps {
    open: boolean;
    onClose: () => void;
}

/* ===================== COMPONENT ===================== */
export default function EditCreateDialog({ open, onClose }: EditCreateDialogProps) {
    const { notify } = useNotify();
    const {
        selectedProduct: selectedProduct,
        cateogries: categories,
        sizes: sizes,
        colors: colors,
        materials: materials,
        setCategories: setCategories,
        setSizes: setSizes,
        setColors: setColors,
        setMaterials: setMaterials,
    } = useProductStore();



    const title = selectedProduct
        ? `Edit Product: ${selectedProduct.name}`
        : 'Create Product';

    /* ===================== FORMIK ===================== */
    const formik = useFormik({
        initialValues: initalProductValue,
        validationSchema: ProductValueSchema,
        onSubmit: async (values) => {
            try {
                let res;

                if (selectedProduct?.id) {
                    res = await productService.update(selectedProduct.id, {
                        ...values,
                        id: selectedProduct.id,
                    });
                } else {
                    res = await productService.create(values);
                }

                notify({
                    success: res?.payload?.isSuccess,
                    message: res?.payload?.message,
                });

                if (res?.payload?.isSuccess) {
                    onClose();
                }
            } catch (err) {
                notify({
                    success: false,
                    message: `Error: ${err}`,
                });
            }
        },
    });

    /* ===================== FETCH MASTER DATA ===================== */

    useEffect(() => {
        if (open) {
            formik.resetForm({
                values: {
                    name: selectedProduct?.name ?? '',
                    price: selectedProduct?.price ?? 0,
                    categoryId: selectedProduct?.categoryId ?? '',
                    colorId: selectedProduct?.colorId ?? '',
                    sizeId: selectedProduct?.sizeId ?? '',
                    materialId: selectedProduct?.materialId ?? '',
                    description: selectedProduct?.description ?? '',
                    isActive: selectedProduct?.isActive ?? true,
                },
            });
        }
    }, [open, selectedProduct]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [resCate, resColor, resSize, resMate] = await Promise.all([
                    categoryService.getAll(),
                    colorService.getAll(),
                    sizeService.getAll(),
                    materialService.getAll(),
                ]);

                setCategories(resCate?.payload?.data ?? []);
                setColors(resColor?.payload?.data ?? []);
                setSizes(resSize?.payload?.data ?? []);
                setMaterials(resMate?.payload?.data ?? []);
            } catch (err) {
                console.error('Fetch data error:', err);
            }
        };
        fetchData();
    }, []);

    return (
        <MiniShopDialog
            open={open}
            onClose={onClose}
            title={title}
            maxWidth='lg'
        >
            <Grid
                id="create-edit-form"
                component="form"
                onSubmit={formik.handleSubmit}
                container
                spacing={2}
                sx={{ p: 7, pb: 2, width: "100%" }}
            >
                <Grid size={12}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={formik.values.isActive ?? false}
                                onChange={(e) => formik.setFieldValue("isActive", e.target.checked)}
                            />
                        }
                        label={formik.values.isActive ? "Active" : "InActive"}
                    />
                </Grid>

                <MiniShopTextField
                    required
                    formik={formik}
                    name="name"
                    label="Tên sản phẩm"
                    placeholder="Nhập tên"
                />


                <MiniShopCurrencyField
                    required
                    formik={formik}
                    name="price"
                    label="Giá sản phẩm"
                    currencySymbol="₫"
                />


                <MiniShopSelectField
                    required
                    formik={formik}
                    name="categoryId"
                    label="Danh mục"
                    options={categories}
                />

                <MiniShopSelectField
                    required
                    formik={formik}
                    name="colorId"
                    label="Màu sắc"
                    options={colors}
                />

                <MiniShopSelectField
                    required
                    formik={formik}
                    name="sizeId"
                    label="Kích thước"
                    options={sizes}
                />

                <MiniShopSelectField
                    required
                    formik={formik}
                    name="materialId"
                    label="Chất liệu"
                    options={materials}
                />

                <MiniShopTextField
                    gridSize={12}
                    multiline={true}
                    rows={4}
                    formik={formik}
                    name="description"
                    label="Mô tả"
                    placeholder="Nhập mô tả"
                />

            </Grid>
        </MiniShopDialog>

    );
}
