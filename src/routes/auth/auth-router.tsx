import { Box, Card, Typography } from '@mui/material'
import { Outlet, useLocation } from 'react-router-dom'
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom'

function AuthRouter() {
  const token = Cookies.get("token");
  let userLogin = null;
  if (token) {
    try {
      const payloadBase64 = token.split('.')[1];
      if (payloadBase64) {
        const decodedPayload = JSON.parse(atob(payloadBase64));
        userLogin = decodedPayload;
      }

    } catch (error) {
      console.error('Failed to decode token:', error);
    }
  }
  if (userLogin) {
    return <Navigate to={"/"} />;
  };

  const location = useLocation();
  const isRegisterPage = location.pathname.includes('register');

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        width: 'auto',
        height: '100vh',
        bgcolor: 'gray'
      }}>
      <Card sx={{ display: 'flex', width: '70%', height: '90vh', alignItems: 'center', borderRadius: '10px' }}>
        <Box flex={1} >
          <img src="https://i.pinimg.com/736x/69/63/90/69639069477fdc34f07853b60c8c391a.jpg" width={'100%'} />
          <Typography sx={{ fontWeight: 'bold', position: 'absolute', top: '42%', left: '33%', transform: 'translate(-50%, -50%)', width: '25%', textAlign: 'center', textShadow: '2px 2px 4px #855738', color: 'white' }}>
            {isRegisterPage
              ? "There's nothing better than enjoying coffee while sharing moments."
              : "Your coffee adventure awaits."}
            <Typography mt={2}>
              {isRegisterPage
                ? "Register now and indulge in unforgettable coffee experiences!"
                : "Log in and experience the taste of joy."}
            </Typography>
          </Typography>
        </Box>
        <Box flex={1}>
          <Outlet />
        </Box>
      </Card>
    </Box>
  );
}

export default AuthRouter;