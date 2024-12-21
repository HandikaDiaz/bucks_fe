import Cookies from "js-cookie";
import { api } from "../../../utils/api";
import { useQuery } from "@tanstack/react-query";
import { ProfileEntity } from "../../../entities/profile";

export function useGetProfile() {
    async function getProfile() {
        const res = await api.get('/profile/get', {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        })
        return res.data;
    }

    const { data, isLoading } = useQuery<ProfileEntity, null, ProfileEntity>({
        queryKey: ['profile'],
        queryFn: getProfile
    });

    return {
        data,
        isLoading
    }
}