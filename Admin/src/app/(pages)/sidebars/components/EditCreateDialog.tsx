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
    TextField,
} from '@mui/material';
import CloseSidebar from '@mui/icons-material/Close';
import { TransitionProps } from '@mui/material/transitions';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useSidebarStore } from '@/common/stores/sidebar.store';

import { sidebarService } from '@/common/services/sidebar-service';
import { useNotify } from '@/shared/hooks/useNotify';
import MiniShopTextField from '@/shared/components/MiniShopTextField';
import { initalSidebarValue, sidebarValueSchema } from '../validate';
import { iconService } from '@/common/services/icon-service';
import MiniShopSelectField from '@/shared/components/MiniShopSelectField';
import { iconMap } from '@/shared/constants/iconMap';
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
        selectedSidebar,
        icons: icons,
        setIcons: setIcons,
        sidebars: sidebars,
        selectedParentSidebar: selectedParentSidebar,
    } = useSidebarStore();

    const title = selectedSidebar
        ? `Edit Sidebar: ${selectedSidebar.name}`
        : 'Create Sidebar';

    const allIconName: { id: string; name: string; icon: React.ElementType }[] = React.useMemo(
        () =>
            icons.map((item) => ({
                id: item.id,
                name: item.name,
                icon: iconMap[item.iconName] || ViewSidebarOutlinedIcon,
            })),
        [icons]
    );

    const allSidebar: { id: string, name: string }[] = React.useMemo(() =>
        sidebars.map((item) => ({
            id: item.id,
            name: item.name,
        }))
        , [sidebars])

    /* ===================== FORMIK ===================== */
    const formik = useFormik({
        initialValues: initalSidebarValue,
        validationSchema: sidebarValueSchema,
        onSubmit: async (values) => {
            try {
                let res;

                if (selectedSidebar?.id) {
                    res = await sidebarService.update(selectedSidebar.id, {
                        ...values,
                        id: selectedSidebar.id,
                    });
                } else {
                    res = await sidebarService.create(values);
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
    const lastSegment = selectedSidebar?.path?.split("/").pop() ?? "";


    useEffect(() => {
        if (open) {
            formik.resetForm({
                values: {
                    path: lastSegment,
                    parentId: selectedSidebar?.parentId ?? selectedParentSidebar?.id ?? "",
                    iconId: selectedSidebar?.iconId ?? "",
                    name: selectedSidebar?.name ?? '',
                    description: selectedSidebar?.description ?? '',
                    isActive: selectedSidebar?.isActive ?? true,
                },
            });
        }
    }, [open, selectedSidebar]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [resIcon] = await Promise.all([
                    iconService.getAll(),
                ]);

                setIcons(resIcon?.payload?.data ?? []);
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
                    label="Tên sidebar"
                    placeholder="Nhập tên sidebar"
                />

                <MiniShopSelectField
                    disabled
                    formik={formik}
                    name="parentId"
                    label="Mục cha"
                    options={allSidebar}
                />

                <MiniShopSelectField
                    required
                    formik={formik}
                    name="iconId"
                    label="Icon"
                    options={allIconName}
                />

                <MiniShopTextField
                    formik={formik}
                    name="path"
                    label="Path"
                    placeholder="Nhập tên đường dẫn cuối"
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
