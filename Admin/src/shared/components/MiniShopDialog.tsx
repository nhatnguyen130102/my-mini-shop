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
    Divider,
    Box,
    Stack,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps } from '@mui/material/transitions';
import { Fullscreen } from '@mui/icons-material';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children: React.ReactElement<unknown> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface MiniShopDialogProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    handleSubmit?: () => void;
    fullScreen?: boolean;
    formId?: string;       // gắn nút Save với form
    loading?: boolean;
    fullWidth?: boolean;
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    hideFooter?: boolean;  // nếu muốn ẩn footer
}

export default function MiniShopDialog({
    open,
    onClose,
    title,
    children,
    handleSubmit,
    fullScreen = false,
    formId = "create-edit-form",
    loading = false,
    fullWidth = true,
    maxWidth = 'lg',
    hideFooter = false,
}: MiniShopDialogProps) {
    return (
        <Dialog
            fullScreen={fullScreen}
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            open={open}
            onClose={onClose}
            slots={{ transition: Transition }}
            disableEnforceFocus
        >
            {/* HEADER */}
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6">
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* BODY */}
            {children}

            {/* FOOTER */}
            {!hideFooter && (
                <>
                    <Divider />
                    <Box
                        sx={{
                            position: 'sticky',
                            bottom: 0,
                            borderTop: '1px solid',
                            borderColor: 'divider',
                            backgroundColor: 'background.paper',
                            px: 3,
                            py: 2,
                        }}
                    >
                        <Stack direction="row" spacing={2} justifyContent="flex-end">
                            <Button
                                color="primary"
                                variant="outlined"
                                onClick={onClose}
                                disabled={loading}
                            >
                                Cancel
                            </Button>
                            <Button
                                color="primary"
                                variant="contained"
                                type={handleSubmit ? 'button' : 'submit'}
                                onClick={handleSubmit}
                                form={formId}
                                disabled={loading}
                            >
                                Save
                            </Button>
                        </Stack>
                    </Box>
                </>
            )}
        </Dialog>
    );
}
