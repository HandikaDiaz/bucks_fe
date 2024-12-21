import { Box, Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductById } from "../hooks/product";
import EditProduct from "../modal/edit-product";
import { ProductEntity } from "../../../entities/product";
import DeleteProduct from "../modal/delete-product";
import Progress from "../../../components/progress";

function DetailProduct() {
    const id = useParams().id;
    const { data, isLoading } = useGetProductById(Number(id));
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [product, setProduct] = useState<ProductEntity>({
        id: 0,
        productName: '',
        amount: 0,
        description: '',
        image: ''
    });
    const handleOpenEdit = (product: ProductEntity) => {
        setProduct(product);
        setOpenEdit(true);
    };
    const handleCloseEdit = () => setOpenEdit(false);

    const handleOpenDelete = (product: ProductEntity) => {
        setProduct(product)
        setOpenDelete(true)
    };
    const handleCloseDelete = () => setOpenDelete(false);
    
    if (isLoading) {
        return <Progress />;
    };

    return (
        <Stack direction={'row'} mt={5}>
            <Stack width={'50%'} pl={20} justifyContent={'space-between'}>
                <Stack>
                    <Typography gutterBottom variant="h4" fontFamily={'Playfair Display'}>
                        {data?.productName}
                    </Typography>
                    <Typography variant="caption" sx={{ fontFamily: 'Poppins' }}>
                        {data?.description}
                    </Typography>
                </Stack>
                <Stack gap={1}>
                    <Typography variant="subtitle1" sx={{}}>
                        Rp.{data?.amount.toLocaleString('id-ID')}
                    </Typography>
                    <Stack direction={'row'} gap={1}>
                        <Button sx={{ width: '50%', border: '1px solid #855738' }} onClick={() => handleOpenEdit(data!)}>
                            Edit
                        </Button>
                        <Button sx={{ width: '50%', border: '1px solid #855738' }} onClick={() => handleOpenDelete(data!)}>Delete</Button>
                    </Stack>
                    <Button sx={{ bgcolor: '#855738', color: 'white' }}>Order Now</Button>
                </Stack>
            </Stack>
            <Box px={5} width={'50%'} alignItems={'center'} display={'flex'} justifyContent={'center'}>
                <img
                    src={data?.image}
                    style={{ width: '57%', objectFit: 'contain', borderRadius: '10px' }}
                    alt="detail image product" />
            </Box>
            <EditProduct isOpen={openEdit} onClose={handleCloseEdit} product={product} />
            <DeleteProduct isOpen={openDelete} onClose={handleCloseDelete} product={product} />
        </Stack>
    );
}

export default DetailProduct;