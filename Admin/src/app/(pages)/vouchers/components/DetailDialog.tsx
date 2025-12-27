'use client';
import {
    Dialog,
    Typography,
    Stack,
    AppBar,
    IconButton,
    Toolbar,
    Slide,
} from "@mui/material";
import { useVoucherStore } from "@/common/stores/voucher.store";
import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps } from "@mui/material/transitions";
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<unknown>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface DetailDialogProps {
    open: boolean;
    onClose: () => void;
}

const DetailDialog: React.FC<DetailDialogProps> = ({
    open,
    onClose,
}) => {
    const { selectedVoucher } = useVoucherStore();
    if (!selectedVoucher) return null;

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={onClose}
            slots={{
                transition: Transition,
            }}
            disableEnforceFocus
        >
            {/* ===================== HEADER ===================== */}
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={onClose}>
                        <CloseIcon />
                    </IconButton>

                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6">
                        Detail
                    </Typography>
                </Toolbar>
            </AppBar>
        </Dialog>
    );
};

export default DetailDialog;
