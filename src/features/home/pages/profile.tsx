import { Card, CardActionArea, CardMedia, CardContent, Typography, Box } from "@mui/material";
import { useGetProfile } from "../hooks/profile";
import Progress from "../../../components/progress";

function Profile() {
    const { data, isLoading } = useGetProfile();
    if (isLoading) {
        return <Progress />;
    };

    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ width: 750, mt: 5 }}>
                <CardActionArea sx={{ display: 'flex', }}>
                    <CardMedia
                        component="img"
                        height="400"
                        image={data?.image}
                        alt="profile image"/>
                    <CardContent sx={{ width: "100%" }}>
                        <Typography gutterBottom variant="h5" component="div">
                            Email :
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {data?.user?.email}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div" mt={2}>
                            Username :
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {data?.username}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div" mt={2}>
                            Fullname :
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {data?.fullname}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div" mt={2}>
                            Gender :
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {data?.gender}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Box>
    );
}

export default Profile;