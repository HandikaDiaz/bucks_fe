import { useNavigate } from "react-router-dom";
import { api } from "../../../utils/api";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export function useLogout() {
    const navigate = useNavigate();
    const logout = async () => {
        const logoutPromise = api.post('/auth/logout').then(() => {
            Cookies.remove('token');
            toast.success("Logout successful!");
            navigate('/login', { replace: true });
        });
        try {
            await logoutPromise;
        } catch (error) {
            console.log(error);
        }
    };

    return logout;
}