import { Modal, Box, Typography } from "@mui/material";
import { ButtonLink } from "../../../components/button-link";
import { ProductEntity } from "../../../entities/product";
import { useDeleteProduct } from "../hooks/product";

interface InitialFocusModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: ProductEntity;
}

function DeleteProduct({ isOpen, onClose, product }: InitialFocusModalProps) {
    const { onsubmit } = useDeleteProduct(product.id);

    return (
        <Modal
            open={isOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={{ color: 'primary.main', margin: 'auto', width: '50%', height: 'auto', p: 7, bgcolor: 'background.paper', justifyContent: 'center', mt: 19 }}>
                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
                    Delete Data
                </Typography>
                <Typography id="modal-modal-title" variant="caption" component="h2">
                    Are you sure you want to delete this product?
                </Typography>
                <Box sx={{ mt: 6, display: 'flex', justifyContent: 'right', gap: 1 }}>
                    <ButtonLink to="" sx={{  backgroundColor: '#56c05a', ":hover": { backgroundColor: 'white !important', color: '#56c05a !important' } }} onClick={onsubmit}>
                        Yes
                    </ButtonLink>
                    <ButtonLink to="" sx={{  backgroundColor: '#f74d4d', ":hover": { backgroundColor: 'white !important', color: '#f74d4d !important' } }} onClick={onClose}>
                        No
                    </ButtonLink>
                </Box>
            </Box>
        </Modal>
    );
}

export default DeleteProduct;