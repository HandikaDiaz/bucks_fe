import { Box, Button, FormControl, Input, InputAdornment, InputLabel, Modal, Stack, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Progress from "../../../components/progress";
import { ProductEntity } from "../../../entities/product";
import { useUpdateProduct } from "../hooks/product";

interface InitialFocusModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: ProductEntity
}

function EditProduct({ isOpen, onClose, product }: InitialFocusModalProps) {
    const { register, submit, setValue, errors, isLoading } = useUpdateProduct(product.id);

    useEffect(() => {
        if (product) {
            setValue('productName', product.productName);
            setValue('amount', product.amount.toString());
            setValue('description', product.description);
        }
        Object.keys(errors).forEach((field) => {
            const message = errors[field as keyof typeof errors]?.message;
            if (message) {
                toast.error(message);
            }
        });
    }, [product, setValue, errors]);

    if (isLoading) {
        return <Progress />;
    };

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={{ color: 'primary.main', margin: 'auto', width: '85%', p: 5, bgcolor: 'white', justifyContent: 'center', mt: 5 }}>
                <form onSubmit={submit} encType="multipart/form-data">
                    <Stack direction={'column'} my={5} mx={'auto'} flex={1} width={'50%'} px={5}>
                        <Typography variant="h4" fontWeight={'bold'} mb={2}>
                            Product
                        </Typography>
                        <FormControl sx={{ m: 1 }} variant="standard">
                            <InputLabel>Name Product</InputLabel>
                            <Input type="text" {...register('productName')} />
                        </FormControl>
                        <FormControl sx={{ m: 1 }} variant="standard">
                            <InputLabel>Amount</InputLabel>
                            <Input {...register('amount')} startAdornment={<InputAdornment position="start">Rp.</InputAdornment>} />
                        </FormControl>
                        <FormControl sx={{ m: 1 }} variant="standard">
                            <TextField
                                label="Description"
                                multiline
                                maxRows={4}
                                variant="standard"
                                {...register('description')} />
                        </FormControl>
                        <Button
                            component="label"
                            fullWidth
                            sx={{ borderRadius: '5px', border: '2px solid #855738', mt: 4 }}>
                            <Typography sx={{ p: .5, fontSize: '13px', fontWeight: 'bold' }}>Upload Image</Typography>
                            <Input {...register('image')} sx={{ p: 0.2, display: 'none' }} type='file' />
                        </Button>
                        <Button type="submit" sx={{ borderRadius: '5px', bgcolor: '#855738', color: 'white', mt: 4 }}>
                            Edit Product
                        </Button>
                    </Stack>
                </form>
            </Box>
        </Modal>
    );
}

export default EditProduct;