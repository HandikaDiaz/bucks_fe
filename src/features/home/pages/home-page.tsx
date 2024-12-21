import { Box, Stack, Typography } from "@mui/material";
import HomeCard from "../card/home-card";
import ProductCard from "../card/product-card";

function HomePage() {
    return (
        <>
            <Box width={'100%'} mt={5} px={'150px'}>
                <HomeCard />
            </Box>
            <Box width={'100%'} my={5} px={'150px'}>
                <Typography variant="h4"mb={1}>
                    Coffee
                </Typography>
                <Stack direction={'row'} sx={{ flexWrap: 'wrap' }} gap={4}>
                    <ProductCard />
                </Stack>
            </Box>
        </>
    );
}

export default HomePage;