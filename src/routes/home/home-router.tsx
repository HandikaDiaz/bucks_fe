import { Box } from "@mui/material";
import Navbar from "../../components/navbar";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

function HomeRouter() {
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
    if (!userLogin) {
        toast.error("You must be login first!");
        return <Navigate to={"/login"} />;
    };

    return (
        <>
            <Box>
                <Navbar />
            </Box>
            <Box>
                <Outlet />
            </Box>
        </>
    );
}

export default HomeRouter;