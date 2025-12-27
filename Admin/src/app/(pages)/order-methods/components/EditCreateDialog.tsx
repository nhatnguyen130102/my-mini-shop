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
import { useUserStore } from '@/common/stores/user.store';
import { initalUserValue, userValueSchema } from '../validate';
import { userService } from '@/common/services/user-service';
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
        selectedUser,
    } = useUserStore();

    const title = selectedUser
        ? `Edit User: ${selectedUser.username}`
        : 'Create User';

    /* ===================== FORMIK ===================== */
    const formik = useFormik({
        initialValues: initalUserValue,
        validationSchema: userValueSchema,
        onSubmit: async (values) => {
            try {
                let res;

                if (selectedUser?.id) {
                    res = await userService.update(selectedUser.id, {
                        ...values,
                        id: selectedUser.id,
                        name: values.email.split("@")[0],
                    });
                } else {
                    res = await userService.create({
                        ...values,
                        name: values.email.split("@")[0],
                    });
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
                    name: selectedUser?.name ?? '',
                    description: selectedUser?.description ?? '',
                    isActive: selectedUser?.isActive ?? true,
                    email: selectedUser?.email ?? '',
                    username: selectedUser?.username ?? '',
                    password: selectedUser?.password ?? '',
                    fullname: selectedUser?.fullname ?? '',
                },
            });
        }
    }, [open, selectedUser]);

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
                    name="username"
                    label="Username"
                    placeholder="Nhập username"
                />

                {
                    !selectedUser?.id && (
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
