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
import { useOrderStore } from '@/common/stores/order.store';
import { initalPaymentMethodValue, paymentMethodValueSchema } from '../validate';
import { paymentMethodService } from '@/common/services/payment-method-service';
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
        selectedPaymentMethod,
    } = useOrderStore();

    const title = selectedPaymentMethod
        ? `Edit Order Method: ${selectedPaymentMethod.code}`
        : 'Create Order Method';

    /* ===================== FORMIK ===================== */
    const formik = useFormik({
        initialValues: initalPaymentMethodValue,
        validationSchema: paymentMethodValueSchema,
        onSubmit: async (values) => {
            try {
                let res;

                if (selectedPaymentMethod?.id) {
                    res = await paymentMethodService.update(selectedPaymentMethod.id, {
                        ...values,
                        id: selectedPaymentMethod.id,
                    });
                } else {
                    res = await paymentMethodService.create(values);
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
                    description: selectedPaymentMethod?.description ?? '',
                    isActive: selectedPaymentMethod?.isActive ?? true,
                    name: selectedPaymentMethod?.name ?? '',
                },
            });
        }
    }, [open, selectedPaymentMethod]);

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
                    label="Name"
                    placeholder="Nhập tênf"
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
