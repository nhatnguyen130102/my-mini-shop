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
import { useVoucherStore } from '@/common/stores/voucher.store';
import { initalVoucherValue, voucherValueSchema } from '../validate';
import { voucherService } from '@/common/services/voucher-service';
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
        selectedVoucher,
    } = useVoucherStore();

    const title = selectedVoucher
        ? `Edit Voucher: ${selectedVoucher.name}`
        : 'Create Voucher';

    /* ===================== FORMIK ===================== */
    const formik = useFormik({
        initialValues: initalVoucherValue,
        validationSchema: voucherValueSchema,
        onSubmit: async (values) => {
            try {
                let res;

                if (selectedVoucher?.id) {
                    res = await voucherService.update(selectedVoucher.id, {
                        ...values,
                        id: selectedVoucher.id,
                    });
                } else {
                    res = await voucherService.create(values);
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
                    name: selectedVoucher?.name ?? '',
                    description: selectedVoucher?.description ?? '',
                    isActive: selectedVoucher?.isActive ?? true,
                    startDate: selectedVoucher?.startDate ?? '',
                    endDate: selectedVoucher?.endDate ?? '',
                    status: selectedVoucher?.status ?? '',
                    type: selectedVoucher?.type ?? '',
                    value: selectedVoucher?.value ?? 0,
                    minimumOrder: selectedVoucher?.minimumOrder ?? 0,
                    maximumDiscount: selectedVoucher?.maximumDiscount ?? 0,
                },
            });
        }
    }, [open, selectedVoucher]);

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
                    name="fullname"
                    label="Tên người dùng"
                    placeholder="Nhập tên người dùng"
                />

                <MiniShopTextField
                    required
                    formik={formik}
                    name="email"
                    label="Email"
                    placeholder="Nhập email"
                />

                <MiniShopTextField
                    required
                    formik={formik}
                    name="vouchername"
                    label="Vouchername"
                    placeholder="Nhập vouchername"
                />

                {
                    !selectedVoucher?.id && (
                        <MiniShopTextField
                            required
                            formik={formik}
                            name="password"
                            label="Password"
                            placeholder="Nhập password"
                        />
                    )
                }



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
