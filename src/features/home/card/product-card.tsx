import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { ButtonLink } from '../../../components/button-link'
import { useGetAllProduct } from '../hooks/product';
import Progress from '../../../components/progress';

function ProductCard() {
    const { data, isLoading } = useGetAllProduct();
    if (isLoading) {
        return <Progress />;
    };

    return (
        <>
            {data?.map((product) => (
                <Card key={product.id} sx={{ width: 275 }}>
                    <ButtonLink sx={{ textDecoration: 'none' }} to={`/detail-product/${product.id}`}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="300"
                                image={product.image}
                                alt="product image" />
                            <CardContent>
                                <Typography gutterBottom variant="h5" fontFamily={'Playfair Display'}>
                                    {product.productName}
                                </Typography>
                                <Typography sx={{ fontFamily: 'Poppins', textAlign: 'justify', width: '225px' }}>
                                    {product.description}
                                </Typography>
                                <Typography variant="subtitle1">
                                    Rp.{product.amount.toLocaleString('id-ID')}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </ButtonLink>
                </Card>
            ))}
        </>
    );
}

export default ProductCard;