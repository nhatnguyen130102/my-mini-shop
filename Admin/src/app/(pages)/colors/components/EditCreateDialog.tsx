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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps } from '@mui/material/transitions';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useColorStore } from '@/common/stores/color.store';
import { initalColorValue, ColorValueSchema } from '../validate';
import { categoryService } from '@/common/services/category-service';
import { colorService } from '@/common/services/color-service';
import { sizeService } from '@/common/services/size-service';
import { materialService } from '@/common/services/material-service';
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
        selectedColor,
    } = useColorStore();

    const title = selectedColor
        ? `Edit Color: ${selectedColor.name}`
        : 'Create Color';

    /* ===================== FORMIK ===================== */
    const formik = useFormik({
        initialValues: initalColorValue,
        validationSchema: ColorValueSchema,
        onSubmit: async (values) => {
            try {
                let res;

                if (selectedColor?.id) {
                    res = await colorService.update(selectedColor.id, {
                        ...values,
                        id: selectedColor.id,
                    });
                } else {
                    res = await colorService.create(values);
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
                    name: selectedColor?.name ?? '',
                    colorCode: selectedColor?.colorCode ?? '',
                    description: selectedColor?.description ?? '',
                    isActive: selectedColor?.isActive ?? true,
                },
            });
        }
    }, [open, selectedColor]);

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

                <MiniShopTextField
                    required
                    formik={formik}
                    name="colorCode"
                    label="Mã màu"
                    placeholder="Nhập mã màu (#ffffff)"
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
