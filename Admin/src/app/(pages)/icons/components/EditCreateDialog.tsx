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
import { useIconStore } from '@/common/stores/icon.store';

import { iconService } from '@/common/services/icon-service';
import { useNotify } from '@/shared/hooks/useNotify';
import MiniShopTextField from '@/shared/components/MiniShopTextField';
import { initalIconValue, iconValueSchema } from '../validate';
import MiniShopSelectField from '@/shared/components/MiniShopSelectField';
import { getAllIconName, iconMap } from '@/shared/constants/iconMap';
import ViewSidebarOutlinedIcon from '@mui/icons-material/ViewSidebarOutlined';
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
        selectedIcon,
    } = useIconStore();

    const allIconName: { id: string; name: string; icon: React.ElementType }[] = React.useMemo(
        () =>
            getAllIconName.map((item) => ({
                id: item,
                name: item,
                icon: iconMap[item] || ViewSidebarOutlinedIcon,
            })),
        [getAllIconName]
    );


    const title = selectedIcon
        ? `Edit Icon: ${selectedIcon.name}`
        : 'Create Icon';

    /* ===================== FORMIK ===================== */
    const formik = useFormik({
        initialValues: initalIconValue,
        validationSchema: iconValueSchema,
        onSubmit: async (values) => {
            try {
                let res;

                if (selectedIcon?.id) {
                    res = await iconService.update(selectedIcon.id, {
                        ...values,
                        id: selectedIcon.id,
                    });
                } else {
                    res = await iconService.create(values);
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
                    name: selectedIcon?.name ?? '',
                    iconName: selectedIcon?.iconName ?? '',
                    description: selectedIcon?.description ?? '',
                    isActive: selectedIcon?.isActive ?? true,
                },
            });
        }
    }, [open, selectedIcon]);

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
                    label="Tên icon"
                    placeholder="Nhập tên icon"
                />

                <MiniShopSelectField
                    required
                    formik={formik}
                    name="iconName"
                    label="Tên icon (Material)"
                    options={allIconName}
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
