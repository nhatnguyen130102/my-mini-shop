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
import { useMaterialStore } from '@/common/stores/material.store';

import { materialService } from '@/common/services/material-service';
import { useNotify } from '@/shared/hooks/useNotify';
import MiniShopTextField from '@/shared/components/MiniShopTextField';
import { initalMaterialValue, materialValueSchema } from '../validate';
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
        selectedMaterial,
    } = useMaterialStore();

    const title = selectedMaterial
        ? `Edit Material: ${selectedMaterial.name}`
        : 'Create Material';

    /* ===================== FORMIK ===================== */
    const formik = useFormik({
        initialValues: initalMaterialValue,
        validationSchema: materialValueSchema,
        onSubmit: async (values) => {
            try {
                let res;

                if (selectedMaterial?.id) {
                    res = await materialService.update(selectedMaterial.id, {
                        ...values,
                        id: selectedMaterial.id,
                    });
                } else {
                    res = await materialService.create(values);
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
                    name: selectedMaterial?.name ?? '',
                    description: selectedMaterial?.description ?? '',
                    isActive: selectedMaterial?.isActive ?? true,
                },
            });
        }
    }, [open, selectedMaterial]);

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
