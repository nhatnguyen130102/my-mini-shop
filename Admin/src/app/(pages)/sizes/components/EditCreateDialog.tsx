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
import { useSizeStore } from '@/common/stores/size.store';
import { initalSizeValue, SizeValueSchema } from '../validate';
import { sizeService } from '@/common/services/size-service';
import { useNotify } from '@/shared/hooks/useNotify';
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
        selectedSize,
    } = useSizeStore();

    const title = selectedSize
        ? `Edit Size: ${selectedSize.name}`
        : 'Create Size';

    /* ===================== FORMIK ===================== */
    const formik = useFormik({
        initialValues: initalSizeValue,
        validationSchema: SizeValueSchema,
        onSubmit: async (values) => {
            try {
                let res;

                if (selectedSize?.id) {
                    res = await sizeService.update(selectedSize.id, {
                        ...values,
                        id: selectedSize.id,
                    });
                } else {
                    res = await sizeService.create(values);
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
                    name: selectedSize?.name ?? '',
                    description: selectedSize?.description ?? '',
                    isActive: selectedSize?.isActive ?? true,
                },
            });
        }
    }, [open, selectedSize]);

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
