import { Button, FormControl, Input, InputAdornment, InputLabel, Stack, TextField, Typography } from "@mui/material";
import Progress from "../../../components/progress";
import { useCreateProduct } from "../hooks/product";

function AddProduct() {
    const { submit, errors, isLoading, register, isSubmitting } = useCreateProduct();

    if (isLoading) {
        return <Progress />;
    };

    return (
        <form onSubmit={submit} encType="multipart/form-data">
            <Stack direction={'column'} my={5} mx={'auto'} flex={1} width={'50%'} px={5}>
                <Typography variant="h4" fontWeight={'bold'} mb={2}>
                    Product
                </Typography>
                <FormControl sx={{ m: 1 }} variant="standard">
                    <InputLabel>Name Product</InputLabel>
                    <Input {...register('productName')} type="text" error={!!errors.productName} />
                </FormControl>
                <FormControl sx={{ m: 1 }} variant="standard">
                    <InputLabel>Amount</InputLabel>
                    <Input {...register('amount')} error={!!errors.amount} startAdornment={<InputAdornment position="start">Rp.</InputAdornment>} />
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
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    sx={{ borderRadius: '5px', bgcolor: '#855738', color: 'white', mt: 4 }}>
                    {isSubmitting
                        ? (<Progress />)
                        : ('Add Product')}
                </Button>
            </Stack>
        </form>
    );
}

export default AddProduct;