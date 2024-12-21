import { Typography } from "@mui/material";

function HomeCard() {
    return (
        <>
            <img src="https://res.cloudinary.com/dqvskcnje/image/upload/v1734780102/m8zw4aoj7eo7coepeynl.png:" alt="image" width={'100%'} />
            <Typography variant="h4" sx={{ fontWeight: 'bold', position: 'absolute', top: '53%', left: '48.7%', transform: 'translate(-50%, -50%)' }}>
                Lexa Bucks
                <Typography width={'55%'} textAlign={'justify'} sx={{ textShadow: '2px 2px 4px rgba(43, 42, 42, 0.5)' }}>
                    Coffee is more than just a drink—it's a way of life.
                    <br />
                    <br />
                    It's the warmth in your hands on a chilly morning, the quiet companion during a busy day,
                    and the perfect start to endless possibilities. Begin your day with a smile, a cup full of
                    inspiration, and the promise of moments worth savoring.
                </Typography>
            </Typography>
        </>
    );
}

export default HomeCard;