import { productService } from '@/common/services/product-service';
import { useProductStore } from '@/common/stores/product.store';
import { useNotify } from '@/shared/hooks/useNotify';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Grid,
} from '@mui/material';

interface AlertDialogProps {
    open: boolean;
    onClose: () => void;
    type: 'changeStatus' | 'deleteSoft' | 'deleteHard';
}

const AlertDialog = ({ open, onClose, type }: AlertDialogProps) => {
    const { selectedProduct: selectedProduct } = useProductStore();
    const { notify } = useNotify();

    const handleSubmit = async () => {
        try {
            let res;
            if (!selectedProduct || !selectedProduct.id) {
                notify({ success: false, message: 'Error' });
                return;
            }

            if (type === 'changeStatus') {
                res = await productService.changeStatus(selectedProduct.id);
            } else if (type === 'deleteSoft') {
                res = await productService.delete(selectedProduct.id);
            } else if (type === 'deleteHard') {
                res = await productService.delete(selectedProduct.id, false);
            } else {
                notify({ success: false, message: 'Error' });
                return;
            }

            notify({
                success: res?.payload?.isSuccess,
                message: res?.payload?.message,
            });

            if (res?.payload?.isSuccess) {
                onClose();
            }
        } catch (err) {
            notify({ success: false, message: `Error: ${err}` });
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                {type === 'deleteSoft'
                    ? 'Xác nhận xoá mềm sản phẩm'
                    : type === 'deleteHard'
                        ? 'Xác nhận xoá cứng sản phẩm'
                        : 'Xác nhận thay đổi trạng thái'}
            </DialogTitle>

            <DialogContent>
                <Typography variant="body1" color="text.secondary">
                    {type === 'deleteSoft'
                        ? `Bạn có chắc chắn muốn xoá mềm sản phẩm: ${selectedProduct?.name}?`
                        : type === 'deleteHard'
                            ? `Bạn có chắc chắn muốn xoá cứng sản phẩm: ${selectedProduct?.name}?`
                            : `Bạn có chắc chắn muốn thay đổi trạng thái sản phẩm: ${selectedProduct?.name}?`}
                </Typography>
            </DialogContent>

            <DialogActions>
                <Grid
                    size={12}
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: 2,
                    }}
                >
                    <Button onClick={onClose} variant="outlined" color="inherit">
                        Huỷ
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        color={(type === 'deleteSoft' || type === 'deleteHard') ? 'error' : 'primary'}
                    >
                        Xác nhận
                    </Button>
                </Grid>
            </DialogActions>
        </Dialog>
    );
};

export default AlertDialog;
